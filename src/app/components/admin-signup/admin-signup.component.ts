import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  formRegister = new FormGroup({});
  constructor(private _formBuilder: FormBuilder,public myapp: AppComponent) { }

  ngOnInit(): void {
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
}
