import { Component, OnInit } from '@angular/core';
import { ApplicationState } from '../state/reducers';
import { LoadDataAction } from '../state/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private store:Store<ApplicationState>) {
    
  }
  ngOnInit(): void {
    this.store.dispatch(new LoadDataAction());
  }

}
