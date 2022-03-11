import { OrderService } from './../../../services/order.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { OrderDetailsService } from './../../../services/order-details.service';
import { CartService } from './../../../services/cart.service';
import { data } from 'jquery';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user=localStorage.getItem('email');
  users=new User();
  orders:any[]=[];
  carts:any[]=[];
  constructor(private _userService:UserService,private _orderService:OrderService,private _order_datails:OrderDetailsService,private _cartService:CartService) { }

  ngOnInit(): void {
    this._userService.get().subscribe(
      (res: any) => {
        this.users = res.data.find((user:any)=>user.email==this.user);
      }
    );

    this._orderService.get().subscribe(
      (res:any)=>{
        this.orders=res.data.filter((orders:any)=>orders.user_id === this.users.id);
        // console.log(this.orders)
      }
    )
  }
  view(id:any){
    this._order_datails.view(id).subscribe(
      (res:any)=>{
        this.carts=res;
        // console.log(this.carts);
        
      }
    );
  }
}
