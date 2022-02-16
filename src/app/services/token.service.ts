import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handel(tok:any){
    this.set(tok);
    console.log(this.payload(tok));
    
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
    }
  }
  
  payload(tok:any){
    const payload= tok.split('.')[1];
    return this.decode(payload);
  }
  decode(payload:any){
    return JSON.parse(atob(payload));
  }
}
