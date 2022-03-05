import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss={
    login:`${environment.URLAPI}login`,
    signup:`${environment.URLAPI}signup`
  }
  constructor() { }

  handel(tok:any){
    this.set(tok);
    console.log(this.isValide());
    
  }
  set(tok:any){
    localStorage.setItem('token',tok);
  }
  
  get(){
    return localStorage.getItem('token');
  }
  
  remove(){
    return localStorage.removeItem('token');
  }
  
  isValide(){
    const tok=this.get();
    if(tok){
      const payload=this.payload(tok);
      if(payload){
        return Object.values(this.iss).indexOf(payload.iss)>-1 ? true:false;
      }
      // if(payload){
      //   return (payload.iss === 'http://127.0.0.1:8000/api/login') ? true : false ;
      // }
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
