import { UserService } from './../../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { User } from 'src/app/models/User';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // username='';
  message='';
  created_at='';
  messages:any= [];
  users:User[]=[];
  newUser:any[]=[]
  user=localStorage.getItem('email');
  ChatUSer:any;
  constructor(private http:HttpClient,private userService:UserService,private _userService:UserService,public myapp:AppComponent) { }

  ngOnInit(): void {
    window.scrollTo(0 , 0);
    Pusher.logToConsole = true;

    const pusher = new Pusher('950c501a49561d478fcc', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);

    });
    this._userService.show(this.user).subscribe(
      (res: any) => {
        this.users = res[0];
        this.newUser.push(this.users);
        this.ChatUSer=this.newUser[0].name;
      },(error:any)=>{
      }
    );
  }
  submit():void{
    this.http.post(`${environment.URLAPI}messages`,{
      username:this.ChatUSer,
      message:this.message
    }).subscribe(()=>this.message='');
  }

}
