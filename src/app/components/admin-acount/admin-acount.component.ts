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
  constructor(private _authService:AuthService,private _formBuilder: FormBuilder,public myapp:AppComponent) { }

  ngOnInit(): void {
    this.formLogin=this._formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
      
      });
  }
//  formLogin={
//     email:null,
//     password:null
//   };
  login(){
    this._authService.adminLogin(this.formLogin).subscribe(
      (response:any)=>{
        console.log(response);
        this.myapp.successmessage(response.message)
      },
      (error:any)=>{
        
        console.log(error);
        this.myapp.errormessage(error.error.error);
      }
    );
  
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
