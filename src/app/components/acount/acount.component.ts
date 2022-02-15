import { SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
declare var FB: any;

import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider } from "angularx-social-login";
import { Account } from 'src/app/models/Account';
@Component({
selector: 'app-acount',
templateUrl: './acount.component.html',
styleUrls: ['./acount.component.css']
})
export class AcountComponent implements OnInit {
formLogin= new FormGroup({});
  formRegister = new FormGroup({});
  account =new Account;
  public loggedin!: boolean;
  public user: any;
  constructor(private _formBuilder: FormBuilder, private authService: SocialAuthService,private router:Router) { }
 
  signin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      alert(JSON.stringify(data));
     this.router.navigateByUrl('/user/profile');
    }).catch(data => {
      alert(JSON.stringify(data));
      this.authService.signOut();
     this.router.navigateByUrl('/home');

    })
  }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
  //     // console.log(data);
  //     alert(JSON.stringify(data));
  //   }).catch(data => {
  //     // alert(JSON.stringify(data));
  //     this.authService.signOut();
  //     this.router.navigateByUrl('/home');
  //   });
  // }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedin = user != null 
      console.log(user);
      
  })
    // (window as any).fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '1617656521913206',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v3.1'
    //   });
    //   FB.AppEvents.logPageView();
    // };
  
    // (function(d, s, id){
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) {return;}
    //    js = d.createElement(s); js.id = id;
    //    js.src = "https://connect.facebook.net/en_US/sdk.js";
    //    fjs.parentNode.insertBefore(js, fjs);
    //  }(document, 'script', 'facebook-jssdk'));


this.formLogin=this._formBuilder.group({
Email:['',[Validators.required,Validators.email]],
Password:['',[Validators.required,Validators.minLength(6)]]

});
this.formRegister=this._formBuilder.group({
  Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
  Email:['',[Validators.required,Validators.email]],
  Password:['',[Validators.required,Validators.minLength(6)]],
  Address:['',[Validators.required,Validators.maxLength(100)]],
  HouseNum:['',[Validators.required]],
  Country:['',[Validators.required]],
  City:['',[Validators.required]],
  Phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
});  
  // auth

// this.authService.initState.subscribe(value => {
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
//     console.log('GoogleContainerComponent.ngOnInit user:', user)
//   });
// })
}
  //facebook fun
  // submitLogin(){
  //   console.log("submit login to facebook");
  //   // FB.login();
  //   FB.login((response)=>
  //       {
  //         console.log('submitLogin',response);
  //         if (response.authResponse)
  //         {
  //           this.toastr.successToastr('login successful', 'Success!');
  //         }
  //          else
  //          {
  //          console.log('User login failed');
  //        }
  //     });

  // }

login():void{
alert(JSON.stringify(this.formLogin.value));
//Call API to validate user
}
register():void{
alert(JSON.stringify(this.formRegister.value));
//Call API to validate user
}
isValidControl(name:string):boolean
{
return this.formLogin.controls[name].valid;
}
isInValidAndTouched(name:string):boolean
{
return this.formLogin.controls[name].invalid && (this.formLogin.controls[name].dirty || this.formLogin.controls[name].touched);
}
isControlHasError(name:string,error:string):boolean
{
return this.formLogin.controls[name].invalid && this.formLogin.controls[name].errors?.[error];
}


isValidControl2(name:string):boolean
{
return this.formRegister.controls[name].valid;
}
isInValidAndTouched2(name:string):boolean
{
return this.formRegister.controls[name].invalid && (this.formRegister.controls[name].dirty || this.formRegister.controls[name].touched);
}
isControlHasError2(name:string,error:string):boolean
{
return this.formRegister.controls[name].invalid && this.formRegister.controls[name].errors?.[error];
}


// signInWithGoogle(): void {
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (data)=>{
//     localStorage.setItem('google_auth',JSON.stringify(data));
//     this.router.navigateByUrl('/home').then();
//   });
  
// }

googleLoginOptions = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

  

signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
      // console.log(data);
      alert(JSON.stringify(data));
      this.account.id=data.id;
      this.account.account_name=data.name;
      this.account.account_email=data.email;
    }).catch(data => {
      // alert(JSON.stringify(data));
      this.authService.signOut();
      this.router.navigateByUrl('/home');
    });
  }
signOut(): void {
  this.authService.signOut();
}

}