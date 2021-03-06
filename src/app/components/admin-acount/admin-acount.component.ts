import { Router } from '@angular/router';
import { AuthenService } from './../../services/authen.service';
import { AdminTokenService } from './../../services/admin-token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin-acount',
  templateUrl: './admin-acount.component.html',
  styleUrls: ['./admin-acount.component.css']
})
export class AdminAcountComponent implements OnInit {
  formLogin= new FormGroup({});
  formRegister = new FormGroup({});
  error:any;
  constructor(private _authService:AuthService,private _formBuilder: FormBuilder,public myapp:AppComponent,private token:AdminTokenService,private auth:AuthenService,private router:Router) { }

  ngOnInit(): void {
    this.formLogin=this._formBuilder.group({
      admin_email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
      
      });
  }
  login(){
    this._authService.adminLogin(this.formLogin.value).subscribe(
      (response:any)=>{
        
        if(response.adminToken == undefined){
          localStorage.removeItem('adminToken');
          this.myapp.errormessage("Email Or Password Dosn`t Exists");
        }else{
          this.handelResponse(response);
        }
        
      },
      (error:any)=>{
        
        this.handelError(error);
          this.myapp.errormessage(error.error.error);
          
      }
    );
  
  }

  handelResponse(response:any){
    this.token.handel(response.adminToken);
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admn/admin/dashboard');
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
}
