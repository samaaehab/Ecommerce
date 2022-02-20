import { UserService } from './../../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username='';
  message='';
  messages:any= [];
  constructor(private http:HttpClient,private userService:UserService) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('950c501a49561d478fcc', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
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
