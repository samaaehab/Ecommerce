import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-acount',
  templateUrl: './admin-acount.component.html',
  styleUrls: ['./admin-acount.component.css']
})
export class AdminAcountComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }
 formLogin={
    email:null,
    password:null
  };
  login(){
    this._authService.adminLogin(this.formLogin).subscribe(
      (response:any)=>{
        console.log(response);
      },
      (error:any)=>{
        
        console.log(error);
        
      }
    );
  
  }
}
