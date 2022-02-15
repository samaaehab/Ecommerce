import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { User } from 'src/app/models/User';
declare const $: any;

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {


  users:User[]=[];
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
   constructor(private _userService:UserService) { }

   ngOnInit(): void {
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data;
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
    let user = new User();
    user.name=name;
    user.email=email;
    user.password=password;
    user.full_address=full_address;
    user.house_no=house_no;
    user.country=country;
    user.city=city;
    user.phone=phone;
    
    this._userService.post(user).subscribe(
      (response:any)=>{
        console.log(this.users);  
        this.users.push(user);
        alert("okay");
      },
      (error:any)=>{}
    );
  }
  delete(index:number):void
  {
    let user=this.users[index];
    this._userService.delete(user.id)
    .subscribe(
      (response:any)=>{
        const cf=confirm('Are U Sure Delete ?');
        if(cf === true){
          this.users.splice(index,1);
        }else{
          console.log('opps!');
          
        }
        
      },
      (error:any)=>{}
    );
    }

  }