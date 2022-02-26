import { Contact } from './../../../models/contact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-us',
  templateUrl: './contacts-us.component.html',
  styleUrls: ['./contacts-us.component.css']
})
export class ContactsUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  contact = new Contact()
  addfeedback(name:string,email:string,massege:string) {
    this.contact.name = name;
    this.contact.email = email;
    this.contact.massege = massege;
}
}
