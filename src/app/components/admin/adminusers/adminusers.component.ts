import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

import { NgxPaginationModule } from 'ngx-pagination';
declare const $: any;

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {


  customers:Customer[]=[];
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
   constructor(private _userService:UserService) { }

   ngOnInit(): void {
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.customers = res.data;
      }
    );

    }
  
  
  //   add(name:string):void{
  //     let customer = new Customer();
  //     customer.name=name;
  //     this._userService.post(customer).subscribe(
  //       (response:any)=>{
  //         this.customers.push(customer);
  //       },
  //       (error:any)=>{}
  //     );
  //   }
  
  
  // 

  add(name:string,email:string,password:string,full_address:string,house_no:any,country:string,city:string,phone:string):void{
    let customer = new Customer();
    customer.customer_name=name;
    customer.customer_email=email;
    customer.password=password;
    customer.full_address=full_address;
    customer.house_no=house_no;
    customer.country=country;
    customer.city=city;
    customer.phone=phone;
    this._userService.post(customer).subscribe(
      (response:any)=>{
        this.customers.push(customer);
        alert("okay");
      },
      (error:any)=>{}
    );
  }
  delete(index:number):void
  {
    let customer=this.customers[index];
    this._userService.delete(customer.id)
    .subscribe(
      (response:any)=>{
        const cf=confirm('Are U Sure Delete ?');
        if(cf === true){
          this.customers.splice(index,1);
        }else{
          console.log('opps!');
          
        }
        
      },
      (error:any)=>{}
    );
    }

  }