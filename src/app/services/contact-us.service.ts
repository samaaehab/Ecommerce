import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUS } from './../models/ContactUs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  allContacts = new BehaviorSubject<ContactUS[]>([]);
  constructor(private _httpClient: HttpClient) { }

private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `contact_us`); }


public post(contact_us: any) {
  return this._httpClient.post(this.url + `contact_us`, contact_us)
}
}
