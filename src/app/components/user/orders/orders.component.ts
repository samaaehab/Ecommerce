import { OrderService } from './../../../services/order.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user=localStorage.getItem('email');
  users=new User();
  orders:any[]=[];
  constructor(private _userService:UserService,private _orderService:OrderService) { }

  ngOnInit(): void {
    this._userService.get().subscribe(
      (res: any) => {
        this.users = res.data.find((user:any)=>user.email==this.user);
      }
    );

    this._orderService.get().subscribe(
      (res:any)=>{
        this.orders=res.data.filter((orders:any)=>orders.user_id === this.users.id);
        console.log(this.orders)
      }
    )

    // this..get().subscribe(
    //   (res:any)=>{
    //     this.orders=res.data.filter((orders:any)=>orders.user_id === this.users.id);
    //     console.log(this.orders)
    //   }
    // )

  }

}
