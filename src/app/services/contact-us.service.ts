import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUS } from './../models/ContactUs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  allContacts = new BehaviorSubject<ContactUS[]>([]);
  headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)

  constructor(private _httpClient: HttpClient) { }

  private url=`${environment.URLAPI}`;

public get() { return this._httpClient.get(this.url + `contact_us`,{ 'headers': this.headers }); }


public post(contact_us: any) {
  return this._httpClient.post(this.url + `contact_us`, contact_us,{ 'headers': this.headers })
}
public show(id:number){
  return this._httpClient.get(this.url+`contact_us/${id}`);
}
public put(id:number,contact:ContactUS){
  return this._httpClient.put(this.url+`contact_us/${id}`,contact);
}
}
