import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { VotersGuideComponent } from './voters-guide/voters-guide.component';
import { FooterComponent } from './footer/footer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationEffects } from './state/effects';
import { appStateReducer } from './state/reducers';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareCardComponent } from './share-card/share-card.component';
import { DonateCardComponent } from './donate-card/donate-card.component';
import { PollingStationSearchComponent } from './polling-station-search/polling-station-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { HereAddressService } from './services/here-suggest.service';
import { DataService } from './services/data.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditIndexComponent } from './admin-panel/edit-index/edit-index.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

const appRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'termeni-si-conditii', component: TermsAndConditionsComponent, pathMatch: 'full' },
  { path: 'politica-de-confidentialitate', component: PrivacyPolicyComponent, pathMatch: 'full' },
  { path: 'admin-panel', component: AdminPanelComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GeneralInfoComponent,
    VotersGuideComponent,
    FooterComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ShareCardComponent,
    DonateCardComponent,
    PollingStationSearchComponent,
    AdminPanelComponent,
    EditIndexComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ data: appStateReducer }),
    EffectsModule.forRoot([ApplicationEffects]),
    BsDropdownModule.forRoot(),
    MatAutocompleteModule,
    MatTabsModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [
    HereAddressService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
