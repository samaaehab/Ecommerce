import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/User';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allCustomers = new BehaviorSubject<User[]>([]);

  constructor(private _httpClient: HttpClient,private auth:AuthenService) { }
  private url = `${environment.URLAPI}`;

  public get() { return this._httpClient.get(this.url + `users`); }
  public post(user: User) {
    return this._httpClient.post(this.url + `users`, user);

  }

  delete(id:number){
    return this._httpClient.delete(this.url+`users/${id}`);
  }
  put(id:number,user:User){
    return this._httpClient.put(this.url+`users/${id}`,user);
  }
  loginUser(){
    let user=localStorage.getItem('email');
    return user;
  }
  authlogin() {
   let logged = false;
    this.auth.status.subscribe(value => logged = value);
    return logged;
  }
}
