import { AppComponent } from 'src/app/app.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';

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


  totalPrice:number=0; 
  constructor(private _userService: UserService, private router: Router, public myapp: AppComponent, private route: ActivatedRoute
  ,private _cartSeervice:CartService) 
    { this.router.routeReuseStrategy.shouldReuseRoute = () => false;}

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        let products = localStorage.getItem(a);
      
        let splitProduct = products?.split('#$');
        this.productsInCart.push(splitProduct);
        console.log(this.productsInCart);
        this.cartCount=this.productsInCart.length;

      }
    }
    
    for (var i = 0; i < this.productsInCart.length; i++) {
     
     this.totalPrice+=Number(this.productsInCart[i][5]);
     
    }
    
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user:any)=>user.email==this.user);
        this.loggedUser.push(this.users);
        // console.log(this.loggedUser)
      }
    );

    this.getTotalPrice();
    
  }


  
  omg(key:any) {
    // for (var i = 0; i < localStorage.length; i++) {
    //   let a = localStorage.key(i);
    //   if (a?.substring(0, 7) == 'product') {
    //     let products = localStorage.getItem(a);
    localStorage.removeItem(key);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cart']);
   });
  // this.router.navigate(['/cart'], {relativeTo: this.route, skipLocationChange: true});
  // this.ngOnInit();
  }
price:any;
  getQty(qty:any){
    return this.price=qty;
    
  }

  updateCart(id:any,ProdName:any,Image:any,newPrice:any,qty:any,subTotal:any){
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7)+id == 'product'+id) {
       localStorage.removeItem(a?.substring(0, 7)+id);
       localStorage.setItem('product' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + qty + '#$' + subTotal);      }
      
    }
     
    this.myapp.showInfo("Updated Successfuly","Updated");
  }
  getTotalPrice(){
    for(let prod of this.productsInCart){
      console.log(prod[5]);
      
    }
  }
  
  addtodatabase(total_price: any, products_number: any, status: any, store_id: any, user_id: any) {
    let addcart = new Cart();
    addcart.total_price = total_price;
    addcart.products_number=products_number;
    addcart.status = status;
    addcart.store_id = store_id;
    addcart.user_id = user_id;
    this._cartSeervice.post(addcart).subscribe(

      (response:any)=>{
        this.products.push(addcart); 
        // window.location.reload();
        this.myapp.successmessage(response.message);
       console.log(response);
       
        
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
}
