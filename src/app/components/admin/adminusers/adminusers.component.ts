import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from 'src/app/models/User';
import { AppComponent } from 'src/app/app.component';
import  Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  formUser= new FormGroup({});


  users:User[]=[];
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
   constructor(private _formBuilder: FormBuilder,private _userService:UserService ,public myapp: AppComponent) { }

   ngOnInit(): void {
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data;
      }
    );

    this.formUser=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      Email:['',[Validators.required,Validators.email]],      
      Password:['',[Validators.required,Validators.minLength(6)]],      
      Full_address:['',[Validators.required,Validators.maxLength(100)]],      
      HouseNum:['',[Validators.required]],      
      Country:['',[Validators.required]],      
      City:['',[Validators.required]],      
      Phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],      
      
      });
      

    }
  
isValidControl(name:string):boolean
{
return this.formUser.controls[name].valid;
}
isInValidAndTouched(name:string):boolean
{
return this.formUser.controls[name].invalid && (this.formUser.controls[name].dirty || this.formUser.controls[name].touched);
}
isControlHasError(name:string,error:string):boolean
{
return this.formUser.controls[name].invalid && this.formUser.controls[name].errors?.[error];
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
        this.myapp.successmessage(response.message);
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

  delete(index:number):void
  {
    let user=this.users[index];
    this._userService.delete(user.id)
    .subscribe(
     (response: any) => {
        console.log(user);
        
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
            this.users.splice(index, 1);
          
            this.myapp.successmessage(response.message);

          } else if (result.isDismissed) {
            // console.log('Clicked No, File is safe!');
            this.myapp.errormessage("User not Deleted");

            
          }
        })
         
      
        // this.myapp.delete();
        
      },
      (error:any)=>{}
    );
    }

  
  
  }