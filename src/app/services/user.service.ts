import { HttpClient,HttpHeaders} from '@angular/common/http';
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
   headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)

  constructor(private _httpClient: HttpClient,private auth:AuthenService) { }
  private url = `${environment.URLAPI}`;
  public get() {
    
     return this._httpClient.get(this.url + `users`,{ 'headers': this.headers });
  }
  public post(user: User) {
    return this._httpClient.post(this.url + `users`, user,{ 'headers': this.headers });
  }

  delete(id:number){
    return this._httpClient.delete(this.url+`users/${id}`,{ 'headers': this.headers });
  }
  put(id:number,user:User){
    return this._httpClient.put(this.url+`users/${id}`,user,{ 'headers': this.headers });
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
  // sow() {
  //   return this._httpClient.
  // }
}
