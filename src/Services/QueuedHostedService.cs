﻿using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using VotRomania.Models;
using VotRomania.Services.Location;
using VotRomania.Stores;
using VotRomania.Stores.Entities;

namespace VotRomania.Services
{
    public class QueuedHostedService : BackgroundService
    {
        private readonly IBackgroundJobsQueue _jobsQueue;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        private readonly ILogger<QueuedHostedService> _logger;


        public QueuedHostedService(IBackgroundJobsQueue jobsQueue,
            IServiceScopeFactory serviceScopeFactory,
            ILogger<QueuedHostedService> logger)
        {
            _jobsQueue = jobsQueue;
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await BackgroundProcessing(stoppingToken);
        }

        private async Task BackgroundProcessing(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var jobId = await _jobsQueue.DequeueAsync(stoppingToken);

                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var importJobsRepository = scope.ServiceProvider.GetService<IImportJobsRepository>();
                    var importedPollingStationsRepository =
                        scope.ServiceProvider.GetService<IImportedPollingStationsRepository>();
                    var locationSearchService = scope.ServiceProvider.GetService<IAddressLocationSearchService>();


                    try
                    {
                        var jobStatusResult = await importJobsRepository.GetImportJobStatus(jobId);

                        if (jobStatusResult.IsFailure)
                        {
                            continue;
                        }

                        var jobStatus = jobStatusResult.Value.Status;
                        if (jobStatus == JobStatus.Canceled || jobStatus == JobStatus.Finished)
                        {
                            continue;
                        }

                        var query = new ImportedPollingStationsQuery
                        {
                            ResolvedAddressStatus = ResolvedAddressStatusType.NotProcessed
                        };

                        var defaultPagination = new PaginationQuery();

                        var pollingStations =
                            await importedPollingStationsRepository.GetImportedPollingStationsAsync(jobId, query,
                                defaultPagination);

                        if (pollingStations.IsFailure)
                        {
                            continue;
                        }

                        if (pollingStations.Value.RowCount == 0)
                        {
                            await importJobsRepository.UpdateJobStatus(jobId, JobStatus.Finished);
                            continue;
                        }

                        await importJobsRepository.UpdateJobStatus(jobId, JobStatus.Started);

                        foreach (var ps in pollingStations.Value.Results)
                        {
                            var locationSearchResult = await locationSearchService.FindCoordinates(ps.County, ps.Address);

                            ps.ResolvedAddressStatus = locationSearchResult.OperationStatus;
                            ps.Latitude = locationSearchResult.Latitude;
                            ps.Longitude = locationSearchResult.Longitude;
                            ps.FailMessage = locationSearchResult.ErrorMessage;

                            await importedPollingStationsRepository.UpdateImportedPollingStation(jobId, ps);
                        }

                        _jobsQueue.QueueBackgroundWorkItem(jobId);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex,
                            "Error occurred executing {WorkItem}.", nameof(jobId));
                    }
                }

            }
        }

        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Queued Hosted Service is stopping.");

            await base.StopAsync(stoppingToken);
        }
    }
}
