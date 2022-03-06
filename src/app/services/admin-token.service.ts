import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenService {

  private iss={
    login:`${environment.URLAPI}`+"admin/login",
  }
  constructor() { }

  handel(token1:any){
    this.set(token1);
  }
  set(token1:any){
    localStorage.setItem('adminToken',token1);
  }
  
  get(){
    return localStorage.getItem('adminToken');
  }
  
  remove(){
    return localStorage.removeItem('adminToken');
  }
  
  isValide(){
    const token1=this.get();
    if(token1){
      const payload=this.payload(token1);
      // if(payload){
      //   return Object.values(this.iss).indexOf(payload.iss) > -1 ? true:false;
      // }
      if(payload){
        return (payload.iss === 'https://ecommercelaravel22.herokuapp.com/api/admin/login') ? true : false ;
      }
    }
    return false;
  }
  
  payload(token1:any){
    const payload= token1.split('.')[1];
    return this.decode(payload);
  }
  decode(payload:any){
    return JSON.parse(atob(payload));
  }

  isLog(){
    return this.isValide();
  }
}
