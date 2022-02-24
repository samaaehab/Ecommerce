import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formLogin = new FormGroup({});
  formRegister = new FormGroup({});
  users: User[] = [];
  loggedUser: any[] = [];
  cartInOrder:any[]=[];
  user = localStorage.getItem('email');
  storeid: number = 0;
  constructor(private _formBuilder: FormBuilder, private _cartService: CartService, private _userService: UserService,private _storeService:StoreService) { }
  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formRegister = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      Address: ['', [Validators.required, Validators.maxLength(100)]],
      HouseNum: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
    this.getCartData();
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user: any) => user.email == this.user);
        this.loggedUser.push(this.users);
        // console.log(this.loggedUser[0].id)
      }
    );


    this.getstore(4);
    

  }
  // get product id from store id
  getstore(id:any) {
    this._storeService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res.data));
        for (let i in res.data) {
          console.log(res.data[i]);
          if (id == res.data[i].id) {
            console.log(res.data[i].product);
           
            
          }
      
      }
      }
    );
  }
  getCartData() {
    this._cartService.get().subscribe(
      (res: any) => {

        let userCheckout = res.data.filter((u: any) => u.user_id == this.loggedUser[0].id);
        for (let i = 0; i<userCheckout.length;i++) {
          if(userCheckout[i].status=='waiting'){
            this.cartInOrder.push(userCheckout[i]);
            console.log(this.cartInOrder);
            
          }
          // this.storeid = userCheckout[i].store_id;
          // // console.log(this.getstore(this.productid));
          // this._storeService.show(userCheckout[i].store_id).subscribe(
          //   (res: any) => {
          //     console.log(res);
          //   }, (error:any) => {
          //     console.log(error);
          //   }
          // );
         
          console.log(userCheckout[i].store_id);
          
        }
        console.log(userCheckout);

      }
    );

  }
  login(): void {
    alert(JSON.stringify(this.formLogin.value));
    //Call API to validate user
  }
  register(): void {
    alert(JSON.stringify(this.formRegister.value));
    //Call API to validate user
  }
  isValidControl(name: string): boolean {
    return this.formLogin.controls[name].valid;
  }
  isInValidAndTouched(name: string): boolean {
    return this.formLogin.controls[name].invalid && (this.formLogin.controls[name].dirty || this.formLogin.controls[name].touched);
  }
  isControlHasError(name: string, error: string): boolean {
    return this.formLogin.controls[name].invalid && this.formLogin.controls[name].errors?.[error];
  }
  isValidControl2(name: string): boolean {
    return this.formRegister.controls[name].valid;
  }
  isInValidAndTouched2(name: string): boolean {
    return this.formRegister.controls[name].invalid && (this.formRegister.controls[name].dirty || this.formRegister.controls[name].touched);
  }
  isControlHasError2(name: string, error: string): boolean {
    return this.formRegister.controls[name].invalid && this.formRegister.controls[name].errors?.[error];
  }
}