import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private logIn=new BehaviorSubject<boolean>(this.token.isLog());
  public status=this.logIn.asObservable();
  constructor(private token:TokenService) { }

  changeAuthStatus(value:boolean){
    this.logIn.next(value);
  }
}
