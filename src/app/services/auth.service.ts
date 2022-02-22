import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url=`http://127.0.0.1:8000/api`;
  constructor(private http:HttpClient) { }

  login(form:any){
    return this.http.post(`${this.auth_url}/login`,form);
  }

  signup(form:any){
    return this.http.post(`${this.auth_url}/signup`,form);
  }

  resetPassword(form:any){
    return this.http.post(`${this.auth_url}/resetPassword`,form);
  }

  adminLogin(form:any){
    return this.http.post(`${this.auth_url}/admin/login`,form);
  }
}
