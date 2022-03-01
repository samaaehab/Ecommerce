import { ContactUS } from 'src/app/models/ContactUs';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages:any;
contact=new ContactUS();
p: any = 1;
count: any = 5;
searchText:any;
contentMessage:any;
name:any;
  constructor(private _contact:ContactUsService) { }

  ngOnInit(): void {
    this.get();
  }
  get(){
    this._contact.get().subscribe(
      (res:any)=>{
        this.messages=res;
      }
    );
  }
  view(id:any){
    this._contact.show(id).subscribe(
      (res:any)=>{
        this.name=res.name;
        this.contentMessage=res.message;
        this.contact.seen=1;
        this._contact.put(id,this.contact).subscribe(
          (res:any)=>{}
        )
      }
    );
    
  }

}
