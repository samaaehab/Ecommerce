import { UserService } from './../../services/user.service';
import { AuthenService } from './../../services/authen.service';

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
import  Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/User';
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
  constructor(private _formBuilder: FormBuilder, 
    private authService: SocialAuthService,
    private router:Router,
    private _authService:AuthService,
    private token:TokenService,
   private auth:AuthenService,public myapp: AppComponent,
   private _userService:UserService) { } //
 
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
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedin = user != null 
      
  // })
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
      this.handelResponse(response);
      
      localStorage.setItem('email',this.formLogin.value.email);
//this.token.handel(response.access_token);
      //this.myapp.successmessage(response.message);
       //console.log(response);
    },
    (error:any)=>{
      
      this.handelError(error);
          this.myapp.errormessage(error.error.error);
    }
  );

}
register(){
  this._authService.signup(this.formRegister.value).subscribe(
    (response:any)=>{
     this.myapp.successmessage(response.message);
    },
    (error:any)=>{
      this.handelError(error);
      for (const err in error.error.errors) {
        for (let i = 0; i < error.error.errors[err].length; i++){
          console.log(error.error.errors[err][i]);
          this.myapp.errormessage(error.error.errors[err][i]);
        }
      }
    }
  );
}
handelResponse(response:any){
  this.token.handel(response.access_token);
  this.auth.changeAuthStatus(false);
  this.router.navigateByUrl('/home');
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

userData=new User();
signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
      console.log(data);
     // alert(JSON.stringify(data));
      // this.account.id=data.id;
      // this.account.name=data.name;
      // this.account.email=data.email;
      this.userData.name=data.name;
      this.userData.email=data.email;
      this.userData.country=null;
      this.userData.city=null;
      this.userData.full_address=null;
      this.userData.house_no=0;
      this.userData.phone='01000000000';
      this.userData.password=data.idToken;
      let token=data.idToken;
      this._userService.get().subscribe(
        (res:any)=>{
          let userFound=res.data.find((u:any)=>u.email == this.userData.email)
          if(userFound){
            localStorage.setItem('token',token);
            this.router.navigateByUrl('/home');
            
          }else{
            this._userService.post(this.userData).subscribe(
              (res:any)=>{
                localStorage.setItem('token',token);
                this.router.navigateByUrl('/home');
              }
            );
            
          }
          
        }
      ); 

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
