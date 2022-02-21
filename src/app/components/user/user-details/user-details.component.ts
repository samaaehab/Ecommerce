import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users:User[]=[];
  newUser:any[]=[]
  user=localStorage.getItem('email')
  constructor(private _userService:UserService) { }

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

}
