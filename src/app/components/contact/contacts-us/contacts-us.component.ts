import { ContactUsService } from './../../../services/contact-us.service';
import { Contact } from './../../../models/contact';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ContactUS } from 'src/app/models/ContactUs';
 
@Component({
 selector: 'app-contacts-us',
 templateUrl: './contacts-us.component.html',
 styleUrls: ['./contacts-us.component.css']
})
export class ContactsUsComponent implements OnInit {
 
 constructor(private _contact:ContactUsService, public myapp:AppComponent) { }
 
    ngOnInit(): void {
        window.scrollTo(0 , 0);
 }
 contact = new ContactUS();
 addfeedback(name: any, email: any, massege: any) {
 this.contact.name = name;
 this.contact.email = email;
 this.contact.message = massege;
 this.contact.seen=0;
 this._contact.post(this.contact).subscribe(
 (response: any) => {
 this.myapp.successmessage(response.message);
 },
 (error: any) => {
 
 for (const err in error.error.errors) {
 for (let i = 0; i < error.error.errors[err].length; i++) {
//  console.log(error.error.errors[err][i]);
 this.myapp.errormessage(error.error.errors[err][i]);

 }
 
 }
 
 
 }
 );
 
 
 
 
 }
}
