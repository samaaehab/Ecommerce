import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allCustomers = new BehaviorSubject<Customer[]>([]);

  constructor(private _httpClient: HttpClient) { }
  private url=`http://127.0.0.1:8000/api/`;
  public get() { return this._httpClient.get(this.url + `customers`); }
  public post(user: Customer) {
    return this._httpClient.post(this.url + `customers`, user)
  }

  delete(id:number){
    return this._httpClient.delete(this.url+`customers/${id}`);
  }

}
