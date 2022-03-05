import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url=`${environment.URLAPI}`
  constructor(private http:HttpClient) { }

  login(form:any){
    return this.http.post(`${this.auth_url}login`,form);
  }

  signup(form:any){
    return this.http.post(`${this.auth_url}signup`,form);
  }

  resetPassword(form:any){
    return this.http.post(`${this.auth_url}resetPassword`,form);
  }

  adminLogin(form:any){
    return this.http.post(`${this.auth_url}admin/login`,form);
  }
}
