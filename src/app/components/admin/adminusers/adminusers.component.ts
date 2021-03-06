import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from 'src/app/models/User';
import Pusher from 'pusher-js';
import { Router } from '@angular/router';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment.prod';

declare const $: any;

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  formUser = new FormGroup({});
  username = 'Admin';
  message = '';
  messages: any = [];


  users: User[] = [];
  // Pagination parameters.
  p: any = 1;
  count: any = 5;
  searchText: any;
  messagesCount:number=0;
  counter:number=0;
  ordersCount:number=0;
  order_count: any = 0;
  constructor(public myapp: AppComponent, private http: HttpClient,
    private _formBuilder: FormBuilder, private _userService: UserService ,private orderService: OrderService,
    private token: AdminTokenService, private auth: AuthenService,
    private router: Router) { }



  ngOnInit(): void {
    this.getOrderCount();

    Pusher.logToConsole = true;

    const pusher = new Pusher('950c501a49561d478fcc', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      console.log(this.messages);
      this.messages.push(data);
    });
    this.formUser = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Full_address: ['', [Validators.required, Validators.maxLength(100)]],
      HouseNum: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],

    });
    this.getUserData();
  }
  getUserData() {
    this._userService.get().subscribe(
      (res: any) => {
        //console.log(JSON.stringify(res));
        this.users = res.data;
      }
    );
  }

  submit(): void {
    this.http.post(`${environment.URLAPI}messages`, {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }

  isValidControl(name: string): boolean {
    return this.formUser.controls[name].valid;
  }
  isInValidAndTouched(name: string): boolean {
    return this.formUser.controls[name].invalid && (this.formUser.controls[name].dirty || this.formUser.controls[name].touched);
  }
  isControlHasError(name: string, error: string): boolean {
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

  add(name: string, email: string, password: string, full_address: string, house_no: any, country: string, city: string, phone: string): void {
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.full_address = full_address;
    user.house_no = house_no;
    user.country = country;
    user.city = city;
    user.phone = phone;

    this._userService.post(user).subscribe(
      (response: any) => {
        this.users.push(user);
        this.getUserData();
        this.myapp.successmessage(response.message);
      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++) {
            this.myapp.errormessage(error.error.errors[err][i]);
          }

        }
      }
    );
  }
  delete(index: number): void {
    let user = this.users[index];
          Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
          }).then((result) => {

            if (result.isConfirmed) {
              this._userService.delete(index)
              .subscribe(
                (response: any) => {
              this.users.splice(index, 1);
              this.getUserData();
              this.myapp.successmessage(response.message);
            })
            } else if (result.isDismissed) {
              this.myapp.errormessage("User not Deleted");
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

  getOrderCount(){
    this.orderService.get().subscribe(
      (res:any)=>{
        this.ordersCount=res.data.length;
        for(let i = 0 ; i < this.ordersCount ; i++){
          if(res.data[i].status === 'pending'){
            this.order_count++;
          }

        }
      }
    )
  }
}
