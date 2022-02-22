import { AdminTokenService } from './admin-token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private logIn=new BehaviorSubject<boolean>(this.token.isLog());
  public status=this.logIn.asObservable();

  private adminLogIn=new BehaviorSubject<boolean>(this.adminToken.isLog());
  public adminStatus=this.adminLogIn.asObservable();
  constructor(private token:TokenService,private adminToken:AdminTokenService) { }

  changeAuthStatus(value:boolean){
    this.logIn.next(value);
  }

  changeAdminAuthStatus(value:boolean){
    this.adminLogIn.next(value);
  }
}
