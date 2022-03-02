import { ContactUS } from 'src/app/models/ContactUs';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { Router } from '@angular/router';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';
 
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
  name: any;
  messagesCount:number=0;
  counter:number=0;
 constructor(private _contact:ContactUsService ,private token: AdminTokenService, private auth: AuthenService
  , private router: Router ) { }
 
 ngOnInit(): void {
  //  this.get();
  //  this.getmsg();
 }
//  getmsg() {
//   this._contact.get().subscribe(
//     (res:any)=>{
//       console.log(res);
//       this.messages=res;

//       this.messagesCount=res.length;
//       for(let i = 0 ; i < this.messagesCount ; i++){
//         if(res[i].seen === 0){
//           this.counter++;
//         }

//       }
//     }
//   );
// }
//  view(id:any){
//  this._contact.show(id).subscribe(
//  (res:any)=>{
//  this.name=res.name;
//  this.contentMessage=res.message;
//  this.contact.seen=1;
//  this._contact.put(id,this.contact).subscribe(
//    (res: any) => {
//    this.getmsg();
     
//  }
//  )
//  }
//  );
 
//  }

//  logout(event:MouseEvent){
//   event.preventDefault();
//   this.token.remove();
//   this.auth.changeAdminAuthStatus(false);
//   this.router.navigateByUrl('/admin-acount');
// }  
}
