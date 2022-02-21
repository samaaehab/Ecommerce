import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public form={
    email:null
  }
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.auth.resetPassword(this.form).subscribe(
      (res:any)=>{console.log(res);
      },
      (error:any)=>{console.log(error);
      }
    );
  }

  handelResponse(res:any){
    console.log(res);
    
    this.form.email=res;
  }
}
