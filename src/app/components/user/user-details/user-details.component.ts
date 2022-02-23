import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users:User[]=[];
  newUser:any[]=[]
  user=localStorage.getItem('email')
  constructor(private _userService:UserService,public myapp:AppComponent) { }

  ngOnInit(): void {

    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user:any)=>user.email==this.user);
        this.newUser.push(this.users);
        console.log(this.newUser)
      }
    );
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
    // this.edituser.password = password;

    this._userService.put(id, this.edituser)
    .subscribe(
      (response: any) => {
        this.myapp.showInfo('changes updated successfly','update');

      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            console.log(error.error.errors[err][i]);
            this.myapp.errormessage(error.error.errors[err][i]);
          }
          
        }
      }
    );

    
    
  }
}
