import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenService {

  private iss={
    login:"http://127.0.0.1:8000/api/admin/login",
    signup:"http://127.0.0.1:8000/api/signup"
  }
  constructor() { }

  handel(tok:any){
    this.set(tok);
    console.log(this.isValide());
    
  }
  set(tok:any){
    localStorage.setItem('adminToken',tok);
  }
  
  get(){
    return localStorage.getItem('adminToken');
  }
  
  remove(){
    return localStorage.removeItem('adminToken');
  }
  
  isValide(){
    const tok=this.get();
    if(tok){
      const payload=this.payload(tok);
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss)>-1 ? true:false;
      }
    }
    return false;
  }
  
  payload(tok:any){
    const payload= tok.split('.')[1];
    return this.decode(payload);
  }
  decode(payload:any){
    return JSON.parse(atob(payload));
  }

  isLog(){
    return this.isValide();
  }
}