import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {
  count:number=0;
  ordersCount:number=0;
  constructor(private orderService:OrderService,private token:AdminTokenService,private auth:AuthenService,private router:Router) { }

  ngOnInit(): void {
    this.orderService.get().subscribe(
      (res:any)=>{
        this.ordersCount=res.data.length;
        for(let i = 0 ; i < this.ordersCount ; i++){
          if(res.data[i].status === 'pending'){
            this.count++;
          }

        }
      }
    )
  }
  
  logout(event:MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admin-acount');
  }
}
