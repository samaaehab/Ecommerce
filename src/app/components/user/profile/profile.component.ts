import { UserService } from './../../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { User } from 'src/app/models/User';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username='';
  message='';
  messages:any= [];
  users:User[]=[];
  newUser:any[]=[]
  user=localStorage.getItem('email')
  constructor(private http:HttpClient,private userService:UserService,private _userService:UserService,public myapp:AppComponent) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('950c501a49561d478fcc', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user:any)=>user.email==this.user);
        this.newUser.push(this.users);
        console.log(this.newUser[0])
      }
    );
  }
  
  setUsername(username:string):void{
    this.username=username;
  }
  submit():void{
    this.http.post('http://localhost:8000/api/messages',{
      username:this.username,
      message:this.message
    }).subscribe(()=>this.message='');
  }

}
