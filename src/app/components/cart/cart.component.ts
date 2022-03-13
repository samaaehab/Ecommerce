import { AppComponent } from 'src/app/app.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { Massege } from 'src/app/models/Massege';
import { StoreService } from 'src/app/services/store.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user = localStorage.getItem('email');
  products: any[] = [];
  productsInCart: any[] = [];
  cartCount:any;
  loggedUser: any[] = [];
  users:User[]=[];
  DBCart=new Cart();
  totalPrice:number=0;
  productStore:any[]=[];


  constructor(private _userService: UserService, private router: Router, public myapp: AppComponent, private route: ActivatedRoute
  ,private _cartService:CartService,private _storeService:StoreService,private spinner: NgxSpinnerService)
    { this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit(): void {
this.getCartDetails();
this.spinner.show();
if(this.productsInCart.length==0){
  this.spinner.hide();
}

        /* Get Store of Product */
        for(let i=0;i<this.productsInCart.length;i++){
          this._storeService.show(this.productsInCart[i][5]).subscribe(
            (res: any) => {
          let x=res.data;          
          this.productStore.push(x);
          this.spinner.hide();
        }
            );
      }

      /* get Total Price */
    for (var i = 0; i < this.productsInCart.length; i++) {
     this.totalPrice+=Number(this.productsInCart[i][6]);
    }

 /* Get Login User */
    this._userService.show(this.user).subscribe(
      (res: any) => {
        this.users = res[0];
        this.loggedUser.push(this.users);
        
      },(error:any)=>{
      }
    );
    this.addToDBCart();
  }

  /* View Product In Cart */
  getCartDetails(){
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        let products = localStorage.getItem(a);
        let splitProduct = products?.split('#$');
        this.productsInCart.push(splitProduct);
        this.cartCount=this.productsInCart.length;
      }
    }
  }

  /* get Total Price */
  gettotalPrice(){
    return this._cartService.totalPrice();
  }

  /* Remove Items */
removeItem(key:any,storeId:any){
  localStorage.removeItem(key);
  for(let i=0;i<this.productsInCart.length;i++){
    for(let j=0;j<this.productsInCart[i].length;j++){
      if(this.productsInCart[i][5]==storeId){
        this.productsInCart.splice(i,1)
      }
    }
  }
}


price:any;
  getQty(qty:any){
    return this.price=qty;
  }

  updateCart(id:any,ProdName:any,Image:any,newPrice:any,qty:any,subTotal:any,storeID:any){
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7)+storeID == 'product'+storeID) {
       localStorage.removeItem(a?.substring(0, 7)+storeID);
      localStorage.setItem('product'+storeID,id+"#$"+ProdName+"#$"+Image+"#$"+qty+"#$"+newPrice+"#$"+storeID+"#$"+subTotal);
        this.productsInCart = [];
        this.getCartDetails();
      }

    }
    this.myapp.showInfo("Updated Successfuly","Updated");
  }

  /* Add To Cart */
  addToDBCart(){
    if(localStorage.getItem('email')){
      for (let i = 0; i < this.productsInCart.length; i++){
        this.DBCart.products_number=this.productsInCart[i][3];
        this.DBCart.total_price=this.productsInCart[i][6];
        this.DBCart.store_id=this.productsInCart[i][5];
        if (localStorage.getItem('id')) {
          this.DBCart.user_id = localStorage.getItem('id');
        } else {
          this.DBCart.user_id = this.loggedUser[0].id;
        }
        this.DBCart.status='waiting';
        this._cartService.post(this.DBCart).subscribe(
          (res:any)=>{
          });
          localStorage.removeItem('product'+this.DBCart.store_id);
      }
    }
    else{

    }
    // console.log(this.productsInCart);

    // console.log(this.loggedUser[0].id);

    // console.log(this.productsInCart);

    // this._cartSeervice.post().subscribe();
  }
//   addtodatabase(total_price: any, products_number: any, status: any, store_id: any, user_id: any) {
//     let addcart = new Cart();
//     addcart.total_price = total_price;
//     addcart.products_number=products_number;
//     addcart.status = status;
//     addcart.store_id = store_id;
//     addcart.user_id = user_id;
//     this._cartSeervice.post(addcart).subscribe(

//       (response:any)=>{
//         this.products.push(addcart);
//         // window.location.reload();
//         this.myapp.successmessage(response.message);
//        console.log(response);


//       },
//       (error: any) => {
//        for (const err in error.error.errors) {
//          for (let i = 0; i < error.error.errors[err].length; i++){
//            console.log(error.error.errors[err][i]);
//            this.myapp.errormessage(error.error.errors[err][i]);
//          }

//        }
//       }

//     );
// }
}
