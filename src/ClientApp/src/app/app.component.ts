import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadDataAction } from './state/actions';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from '../assets/i18n/ro.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>, translate: TranslateService) {
    translate.setTranslation('ro', defaultLanguage);
    translate.setDefaultLang('ro');
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadDataAction());
  }
}
