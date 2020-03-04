import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadDataAction } from '../state/actions';
import { ApplicationState } from '../state/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private store:Store<ApplicationState>) {
    
  }
  ngOnInit(): void {
    this.store.dispatch(new LoadDataAction());
  }
}
