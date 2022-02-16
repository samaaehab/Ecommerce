import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url=`http://127.0.0.1:8000/api`;
  constructor(private http:HttpClient) { }

  login(form:{}){
    return this.http.post(`${this.auth_url}/login`,form);
  }

  signup(form:{}){
    return this.http.post(`${this.auth_url}/signup`,form);
  }
}
