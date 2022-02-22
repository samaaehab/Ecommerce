import { AdminTokenService } from './admin-token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AfterAdminLoginService implements CanActivate{

  constructor(private token:AdminTokenService,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.token.isLog()){
      return this.token.isLog();
    }else{
      return this.router.navigateByUrl('/admin-acount');
    }
  }
}
