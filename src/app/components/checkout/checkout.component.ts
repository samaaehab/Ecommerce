import { Router } from '@angular/router';
import { OrderDetailsService } from './../../services/order-details.service';
import { OrderDetails } from './../../models/OrderDetails';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from './../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { StoreService } from 'src/app/services/store.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  formLogin = new FormGroup({});
  formRegister = new FormGroup({});
  users=new User();
  order_details=new OrderDetails();
  loggedUser:number=0;
  cartInOrder:any[]=[];
  postOrder = new Order();
  totalPrice:number=0;
  user = localStorage.getItem('email');
  storeid: number = 0;
  handler:any = null;
  constructor(private router:Router,private _formBuilder: FormBuilder, private _cartService: CartService, private _userService: UserService,private _storeService:StoreService,private _orderService:OrderService,private _orderDetailsService:OrderDetailsService,public myapp:AppComponent) { }
  ngOnInit(): void {
    this.loadStripe();
    this.formLogin = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formRegister = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email]],
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
        //console.log(this.users.id);
        
        this._cartService.getCartsForEachUser(this.users.id).subscribe(
          (res:any)=>{
            this.cartInOrder=res;
            for(let i of this.cartInOrder){
              this.totalPrice+=Number(i.total_price);
            }
            // console.log(this.cartInOrder);
            
            
          }
        )
      
      }
    );
    

    // this.getstore(4);
    // this.addOrder();
    
  }
  
  // get product id from store id
  // getstore(id:any) {
  //   this._storeService.get().subscribe(
  //     (res: any) => {
  //       console.log(JSON.stringify(res.data));
  //       for (let i in res.data) {
  //         console.log(res.data[i]);
  //         if (id == res.data[i].id) {
  //           console.log(res.data[i].product);


  //         }

  //     }
  //     }
  //   );
  // }
  addOrder(Name:string,Address:string,HouseNum:any,City:string,Country:string,Phone:any,totalPrice:string,email:string){
    this.postOrder.name=Name;
    this.postOrder.full_address=Address;
    this.postOrder.house_no=HouseNum;
    this.postOrder.city=City;
    this.postOrder.country=Country;
    this.postOrder.phone=Phone;
    this.postOrder.email=email;
    this.postOrder.user_id=this.users.id;
    
    this.postOrder.discount=0;
    this.postOrder.price=Number(totalPrice);
    if(this.postOrder.price >=5000){
      this.postOrder.discount=200;
    }else if(this.postOrder.price >=1000){
      this.postOrder.discount=100;
    }else{
      this.postOrder.discount=0;
    }

    if($('#cashMethod').prop('checked')){
      this.postOrder.payment_method=$('#cashMethod').prop('value');
    }

    if($('#creditMetod').prop('checked')){
      this.postOrder.payment_method=$('#creditMetod').prop('value');
    }

    if(this.postOrder.payment_method==='cash' && this.cartInOrder.length>0){
      this._orderService.post(this.postOrder).subscribe(
      (res:any)=>{
        this.router.navigateByUrl('/cart/checkout/confirm');
        },
        (error)=>{
          for (const err in error.error.errors) {
            for (let i = 0; i < error.error.errors[err].length; i++) {
              this.myapp.errormessage(error.error.errors[err][i]);   
            }   
            }
        }
      ); 
      
    }else if(this.postOrder.payment_method === 'credit card' && this.cartInOrder.length>0){
      if(localStorage.getItem('orderToken')){
        this._orderService.post(this.postOrder).subscribe(
          (res:any)=>{
            this.router.navigateByUrl('/cart/checkout/confirm');
            localStorage.removeItem('orderToken');
            },
            (error)=>{
              for (const err in error.error.errors) {
                for (let i = 0; i < error.error.errors[err].length; i++) {
                this.myapp.errormessage(error.error.errors[err][i]);   
                }   
                }
            }
          ); 
      }else{
         this.myapp.errormessage('Confirm U are Pay Firstly');
      }
      
    }else{
      this.myapp.errormessage('Check Products In Ur Order Or Confirm U are Pay');
    }
    
      
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
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KXiTqCac1rFJKk7X7T633HwpeZOAzTipqVW1faLM1C4gIH0wT9sJY7XcyPiTOEXNx2uy0ewAbrDTieDM22KE4eY00WY7971N6',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        if(token){
          localStorage.setItem('orderToken',token.id);
        }
      
      }
    });
 
    handler.open({
      name: 'Welcome',
      description: 'Pay Now',
      amount: this.totalPrice *100
    });
 
  }
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KXiTqCac1rFJKk7X7T633HwpeZOAzTipqVW1faLM1C4gIH0wT9sJY7XcyPiTOEXNx2uy0ewAbrDTieDM22KE4eY00WY7971N6',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  return(id:any,s_id:any,p_id:any,p_name:any,img:any,p_number:any,disc:any,pric:any,tot_price:any){
    this._cartService.delete(id).subscribe(
      (res:any)=>{
         localStorage.setItem('product'+s_id,p_id+"#$"+p_name+"#$"+this.imagepath+img+"#$"+p_number+"#$"+(pric-disc)+"#$"+s_id+"#$"+tot_price);
         this.router.navigateByUrl('/cart');
      }
    );
   
  }
}
