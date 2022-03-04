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
  ,private _cartService:CartService,private _storeService:StoreService)
    { this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit(): void {
this.getCartDetails();
    this._storeService.get().subscribe(
      (res: any) => {
        console.log(res.data);
        let data=res.data;
        console.log(data);
        for(let i=0;i<this.productsInCart.length;i++){
          let x= res.data.find((cat:any)=>cat.id==this.productsInCart[i][5]);
          // console.log(x);
          // console.log(this.productsInCart[i][5]);
          this.productStore.push(x);
        }
        console.log(this.productStore)

      }
    );

    for (var i = 0; i < this.productsInCart.length; i++) {

     this.totalPrice+=Number(this.productsInCart[i][6]);

    }


    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user:any)=>user.email==this.user);
        this.loggedUser.push(this.users);
        // console.log(this.loggedUser[0].id)
      }
    );
    this.addToDBCart();
  }
  getCartDetails(){
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        let products = localStorage.getItem(a);

        let splitProduct = products?.split('#$');
        this.productsInCart.push(splitProduct);
        // alert(this.productsInCart);
        this.cartCount=this.productsInCart.length;


      }
    }
  }
  gettotalPrice(){
    return this._cartService.totalPrice();
  }
removeItem(key:any,storeId:any){
//  let x= this.productsInCart.indexOf(storeId);
  localStorage.removeItem(key);

  for(let i=0;i<this.productsInCart.length;i++){
    // console.log(this.productsInCart[i].findIndex(storeId));
    // console.log(this.productsInCart[i]);
    for(let j=0;j<this.productsInCart[i].length;j++){
      if(this.productsInCart[i][5]==storeId){
        this.productsInCart.splice(i,1)
      }
      // console.log(this.productsInCart[i][j]);
    }

  }
  //  console.log(this.productsInCart[0]);
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
      //  localStorage.setItem('product' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + qty + '#$' + subTotal);
      localStorage.setItem('product'+storeID,id+"#$"+ProdName+"#$"+Image+"#$"+qty+"#$"+newPrice+"#$"+storeID+"#$"+subTotal);
        this.productsInCart = [];
        this.getCartDetails();

      }

    }
    this.myapp.showInfo("Updated Successfuly","Updated");
  }


  addToDBCart(){
    // console.log(this.DBCart.d);
    if(localStorage.getItem('email')){

      for (let i = 0; i < this.productsInCart.length; i++){
        // alert(this.productsInCart[i][3])
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
            console.log(res.message);
          });
          localStorage.removeItem('product'+this.DBCart.store_id);

      }

    }
    else{

    }
    console.log(this.productsInCart);

    console.log(this.loggedUser[0].id);

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
