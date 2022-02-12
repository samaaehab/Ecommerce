import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
selector: 'app-checkout',
templateUrl: './checkout.component.html',
styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
formLogin= new FormGroup({});
formRegister = new FormGroup({});
constructor(private _formBuilder:FormBuilder) { }
ngOnInit(): void {
this.formLogin=this._formBuilder.group({
Email:['',[Validators.required,Validators.email]],
Password:['',[Validators.required,Validators.minLength(6)]]
});
this.formRegister=this._formBuilder.group({
Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
Address:['',[Validators.required,Validators.maxLength(100)]],
HouseNum:['',[Validators.required]],
Country:['',[Validators.required]],
City:['',[Validators.required]],
Phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
});
}
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
}