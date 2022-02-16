import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// const FacebookStrategy = require("passport-facebook").Strategy;
declare var name: any;
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public translate: TranslateService , private _toastrService:ToastrService
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

  // @Injectable()
  successmessage() {
    this._toastrService.success("added successfly", "Success");
  }
  errormessage() {
    this._toastrService.error("error message","Error");
  }
}