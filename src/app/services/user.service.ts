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

  constructor(private _httpClient: HttpClient,private auth:AuthenService) { }
  private url = `${environment.URLAPI}`;
  public get() {
     const headers= new HttpHeaders().set('api_password', 'ase1iXcLAxanvXLZcgh6tk')
     return this._httpClient.get(this.url + `users`,{ 'headers': headers });
  }
  public post(user: User) {
    const headers= new HttpHeaders().set('api_password', 'ase1iXcLAxanvXLZcgh6tk')
    return this._httpClient.post(this.url + `users`, user,{ 'headers': headers });
  }

  delete(id:number){
    const headers= new HttpHeaders().set('api_password', 'ase1iXcLAxanvXLZcgh6tk')
    return this._httpClient.delete(this.url+`users/${id}`,{ 'headers': headers });
  }
  put(id:number,user:User){
    const headers= new HttpHeaders().set('api_password', 'ase1iXcLAxanvXLZcgh6tk')
    return this._httpClient.put(this.url+`users/${id}`,user,{ 'headers': headers });
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
