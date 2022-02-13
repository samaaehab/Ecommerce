import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit {
  orders:Order[]=[];
  // Pagination parameters.
  p: any = 1;
  count: any = 3;
  searchText:any;
  constructor(private _orderService:OrderService) { }

  ngOnInit(): void {
    this._orderService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.orders = res.data;
      }
    );
  }

  delete(index:number):void
  {
    let order=this.orders[index];
    this._orderService.delete(order.id)
    .subscribe(
      (response:any)=>{
        const cf=confirm('Are U Sure to cancel order ?');
        if(cf === true){
          this.orders.splice(index,1);
        }else{
          console.log('opps!');
          
        }
        
      },
      (error:any)=>{}
    );
    

  }

}
