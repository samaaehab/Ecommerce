import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenService } from 'src/app/services/authen.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  users:User[]=[];
  newUser:any[]=[]
  user=localStorage.getItem('email')
  public logged=false;

  constructor(private _userService:UserService, private auth:AuthenService,private router:Router,private token:TokenService) { }

  ngOnInit(): void {
    this._userService.show(this.user).subscribe(
      (res: any) => {
        this.users = res[0];
        this.newUser.push(this.users);  
      },(error:any)=>{
      }
    );
  }
}
