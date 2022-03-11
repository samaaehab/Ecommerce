import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public form={
    email:null
  }
  constructor(private auth:AuthService,public myapp:AppComponent) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.auth.resetPassword(this.form).subscribe(
      (res:any)=>{
        this.myapp.successmessage("Check Your Acount");
      },
      (error:any)=>{
        this.myapp.errormessage("Enter Correct Email");
      }
    );
  }

  handelResponse(res:any){
    // console.log(res);
    
    this.form.email=res;
  }
}
