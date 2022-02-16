import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// const FacebookStrategy = require("passport-facebook").Strategy;
declare var name: any;
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import  Swal from 'sweetalert2';


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
  successmessage(rs:any) {
    this._toastrService.success(rs, "Success");
  }
  errormessage(rs:any) {
    this._toastrService.error(rs,"Error");
  }
  delete() {
    // this._toastrService.warning("asd1", "asd2");
    // this._toastrService.warning('Are you sure?', {onOk: () => { console.log('ok') }, onCancel: () => { console.log('cancel')}})
    // Swal.fire('This is a simple and sweet alert');
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {

        console.log('Clicked Yes, File deleted!');

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
  }
  showInfo(message: any, title:any){
    this._toastrService.info(message, title)
}
 
showWarning(message:any, title:any){
  this._toastrService.warning(message, title)
}
}