import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

import { AppComponent } from 'src/app/app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users= new User();
  newUser:any[]=[];
  formEdit = new FormGroup({});
  user=localStorage.getItem('email')
  constructor(private _userService:UserService,public myapp:AppComponent,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this._userService.show(this.user).subscribe(
      (res: any) => {
        this.users=res[0];
        this.formEdit = this._formBuilder.group({
          name: [this.users.name,[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
          email: [this.users.email, [Validators.required, Validators.email]],
          full_address: [this.users.full_address],
          house_no: [this.users.house_no],
          country: [this.users.country],
          city: [this.users.city],
          phone: [this.users.phone,[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
        });
        
      },(error:any)=>{
      }
    );


  }
 
  isValidControl2(name: string): boolean {
    return this.formEdit.controls[name].valid;
  }
  isInValidAndTouched2(name: string): boolean {
    return this.formEdit.controls[name].invalid && (this.formEdit.controls[name].dirty || this.formEdit.controls[name].touched);
  }
  isControlHasError2(name: string, error: string): boolean {
    return this.formEdit.controls[name].invalid && this.formEdit.controls[name].errors?.[error];
  }

  edituser = new User();
  update(id: any, name: string, email: string, phone: any, full_address: string, country: string, city: string, house_no: any) {
    this.edituser.id = id
    this.edituser.name = name
    this.edituser.email = email
    this.edituser.phone = phone
    this.edituser.full_address = full_address
    this.edituser.country = country
    this.edituser.city = city
    this.edituser.house_no = house_no

    this._userService.put(id, this.edituser)
    .subscribe(
      (response: any) => {
        this.myapp.showInfo('changes updated successfly','update');

      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            this.myapp.errormessage(error.error.errors[err][i]);
          }
          
        }
      }
    );

    
    
  }
}
