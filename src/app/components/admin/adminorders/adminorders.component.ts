import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AppComponent } from 'src/app/app.component';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';
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
  count: any = 5;
  searchText:any;
  constructor(private _orderService: OrderService, public myapp: AppComponent,
    private orderService: OrderService ,
    private token: AdminTokenService, private auth: AuthenService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderData();
  }
getOrderData(){
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
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
        }).then((result) => {
    
          if (result.isConfirmed) {   
            this._orderService.delete(order.id)
            .subscribe(
              (response: any) => {
                console.log(order); 
            this.orders.splice(index, 1);
            this.getOrderData();
            this.myapp.successmessage(response.message);
          })
          } else if (result.isDismissed) {
            // console.log('Clicked No, File is safe!');
            this.myapp.errormessage("Order not Deleted");
          }
      });
    

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
        this.getOrderData();
        this.myapp.showInfo(' order updated Successfly','update');
        
      
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
  logout(event:MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admin-acount');
  }

}
