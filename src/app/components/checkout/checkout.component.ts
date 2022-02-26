import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { StoreService } from 'src/app/services/store.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formLogin = new FormGroup({});
  formRegister = new FormGroup({});
  users=new User();
  loggedUser:number=0;
  cartInOrder:any[]=[];
  postOrder = new Order();
  totalPrice:number=0;
  user = localStorage.getItem('email');
  storeid: number = 0;
  constructor(private _formBuilder: FormBuilder, private _cartService: CartService, private _userService: UserService,private _storeService:StoreService,private _orderService:OrderService) { }
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
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user: any) => user.email == this.user);
        // console.log(this.users.id);
        
        this._cartService.getCartsForEachUser(this.users.id).subscribe(
          (res:any)=>{
            this.cartInOrder=res;
            for(let i of this.cartInOrder){
              this.totalPrice+=Number(i.total_price);
            }
            console.log(this.totalPrice);
            
            
          }
        )
      
      }
    );
    

    this.getstore(4);
    // this.addOrder();
    
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
  addOrder(Name:string,Address:string,HouseNum:any,City:string,Country:string,Phone:any,Payment:string){
    this.postOrder.name=Name;
    this.postOrder.full_address=Address;
    this.postOrder.house_no=HouseNum;
    this.postOrder.city=City;
    this.postOrder.country=Country;
    this.postOrder.phone=Phone;
    this.postOrder.payment_method=Payment;
    this.postOrder.user_id=this.users.id;
    
      console.log(this.users.id);
    
    
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
