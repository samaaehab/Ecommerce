import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public form = {
    email : null,
    password : null,
    password_confirmation:null,
    resetToken :null
  }
  constructor( private router:Router,private route:ActivatedRoute,private auth:AuthService,public myapp:AppComponent) { 
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }
  onSubmit() {
    let pass1 = document.getElementById('pass1');
    let pass2 = document.getElementById('pass2');
    if (pass1 == pass2) {
  
      this.auth.changePassword(this.form).subscribe(
        res => {
          this.myapp.successmessage("Now Login With New Password");
          this.router.navigateByUrl('/acount');
        },
        error => this.myapp.errormessage(error.error.error)
      )
    } else {
      this.myapp.errormessage("password not match")
}
  }
  ngOnInit(): void {
  }

}
