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
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/User';
import { data } from 'jquery';
@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.css']
})
export class AcountComponent implements OnInit {
  formLogin = new FormGroup({});
  formRegister = new FormGroup({});
  account = new Account;
  public loggedin!: boolean;
  public user: any;
  public error: any;
  U_Login: any[] = [];

  userLogin = new User();
  constructor(private _formBuilder: FormBuilder,
    private authService: SocialAuthService,
    private router: Router,
    private _authService: AuthService,
    private token: TokenService,
    private auth: AuthenService, public myapp: AppComponent,
    private _userService: UserService) { } //

    /* Sign up -> Facebook */
  signin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.userData.name = data.name;
      this.userData.email = data.email;
      this.userData.password = '000000';
      this.userData.city = 'cairo';
      this.userData.country = null;
      this.userData.phone = '01022222222';
      this.userData.house_no = null;
      this.userData.full_address = null;
        this._userService.post(this.userData).subscribe(
          (res: any) => {
            res.next();
          }
        );
        this.userLogin.email = data.email;
        this.userLogin.password = this.userData.password;
        this._authService.login(this.userLogin).subscribe(
          (response: any) => {
            this.handelResponse(response);

            localStorage.setItem('email', this.userLogin.email);
          },
          (error: any) => {

            this.handelError(error);
            this.myapp.errormessage(error.error.error);
          }
        );
    }).catch(data => {
      this.authService.signOut();

    })
  }

  ngOnInit(): void {
    this.U_Login;
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
    this.formRegister = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      full_address: [''],
      house_no: [''],
      country: [''],
      city: [''],
      phone: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
    });

  }

  login() {
    this._authService.login(this.formLogin.value).subscribe(
      (response: any) => {
        this.handelResponse(response);

        localStorage.setItem('email', this.formLogin.value.email);
      },
      (error: any) => {

        this.handelError(error);
        this.myapp.errormessage(error.error.error);
      }
    );

  }
  register() {
    this._authService.signup(this.formRegister.value).subscribe(
      (response: any) => {
        this.myapp.successmessage(response.message);
      },
      (error: any) => {
        this.handelError(error);
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++) {
            this.myapp.errormessage(error.error.errors[err][i]);
          }
        }
      }
    );
  }
  handelResponse(response: any) {
    this.token.handel(response.access_token);
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/home');
  }

  handelError(error: any) {
    this.error = error.error.error;

  }

/* Validations */
  isValidControl(name: string): boolean {
    return this.formLogin.controls[name].valid;
  }
  isInValidAndTouched(name: string): boolean {
    return this.formLogin.controls[name].invalid && (this.formLogin.controls[name].dirty || this.formLogin.controls[name].touched);
  }
  isControlHasError(name: string, error: string): boolean {
    return this.formLogin.controls[name].invalid && this.formLogin.controls[name].errors?.[error];
  }


  isValidControl2(name: string): boolean {
    return this.formRegister.controls[name].valid;
  }
  isInValidAndTouched2(name: string): boolean {
    return this.formRegister.controls[name].invalid && (this.formRegister.controls[name].dirty || this.formRegister.controls[name].touched);
  }
  isControlHasError2(name: string, error: string): boolean {
    return this.formRegister.controls[name].invalid && this.formRegister.controls[name].errors?.[error];
  }


  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

  /* SignUp From Google */
  userData = new User();
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions).then((data) => {
      this.userData.name = data.name;
      this.userData.email = data.email;
      this.userData.password = '000000';
      this.userData.city = 'cairo';
      this.userData.country = null;
      this.userData.phone = '01222222222';
      this.userData.house_no = null ;
      this.userData.full_address = null;
        this._userService.post(this.userData).subscribe(
          (res: any) => {
            res.next();
          }
        );
        this.userLogin.email = data.email;
        this.userLogin.password = this.userData.password;
        this._authService.login(this.userLogin).subscribe(
          (response: any) => {
            this.handelResponse(response);
            localStorage.setItem('email', this.userLogin.email);
          },
          (error: any) => {
            this.handelError(error);
            this.myapp.errormessage(error.error.error);
          }
        );

    }).catch(data => {
      this.authService.signOut();
    });
  }
  signOut(): void {
    this.authService.signOut();
  }

}
