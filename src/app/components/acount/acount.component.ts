import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
declare var FB: any;

import { JsonpClientBackend, HttpClient } from '@angular/common/http';
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
  public error:any;
  constructor(private _formBuilder: FormBuilder, private authService: SocialAuthService,private router:Router,private _authService:AuthService,private token:TokenService) { }
 
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
email:['',[Validators.required,Validators.email]],
password:['',[Validators.required,Validators.minLength(6)]]

});
this.formRegister=this._formBuilder.group({
  name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]],
  full_address:['',[Validators.required,Validators.maxLength(100)]],
  house_no:['',[Validators.required]],
  country:['',[Validators.required]],
  city:['',[Validators.required]],
  phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
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
 login(){
  this._authService.login(this.formLogin.value).subscribe(
    (response:any)=>{
      console.log(response.access_token);
      
      
    },
    (error:any)=>{
      console.log(error);
      
    }
  );

}
register(){
  this._authService.signup(this.formRegister.value).subscribe(
    (response:any)=>{
      this.handelResponse(response);  
    },
    (error:any)=>{
      this.handelError(error);
    }
  );
}
handelResponse(response:any){
  this.token.handel(response.access_token);
}

handelError(error:any){
  this.error=error.error.error;
  
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