import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AppComponent } from 'src/app/app.component';
import  Swal from 'sweetalert2';
declare const $: any;
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
  constructor(private _orderService:OrderService ,public myapp: AppComponent) { }

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
      (response: any) => {
        console.log(order);
        
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
        }).then((result) => {
    
          if (result.isConfirmed) {    
            // console.log('Clicked Yes, File deleted!');
            this.orders.splice(index, 1);
          
            this.myapp.successmessage(response.message);

          } else if (result.isDismissed) {
            // console.log('Clicked No, File is safe!');
            this.myapp.errormessage("Order not Deleted");

            
          }
        })
         
      
        // this.myapp.delete();
        
      },
      (error:any)=>{}
    );
    

  }

  edit(id:number){
    
    this.orders.forEach(
      o=>{
        if(o.id == id){
          $("#orderid").prop('value',o?.id);
          $("#order_status").prop('value',o?.status);
        }
      }
    );
    
  }
  order =new Order();
  update(id:any,status:any):void
  {
    this.order.status=status;
    this._orderService.put(id,this.order)
    .subscribe(
      (response: any) => {
        this.myapp.showInfo(' order updated Successfly','update');
        
        window.location.reload();
      
      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            console.log(error.error.errors[err][i]);
            this.myapp.errormessage(error.error.errors[err][i]);
          }
          
        }
      }
    );
    
  }


}
