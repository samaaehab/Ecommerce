import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// const FacebookStrategy = require("passport-facebook").Strategy;
declare var name: any;
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(): void {
    new name();
  }
  title = 'final';
}
