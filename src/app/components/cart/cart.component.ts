import { AppComponent } from 'src/app/app.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  totalPrice:number=0; 
    constructor(private _userService: UserService, private router:Router,public myapp:AppComponent) { }

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
    
    
  }


  
  omg(key:any) {
    // for (var i = 0; i < localStorage.length; i++) {
    //   let a = localStorage.key(i);
    //   if (a?.substring(0, 7) == 'product') {
    //     let products = localStorage.getItem(a);
    localStorage.removeItem(key);
    // this.router.navigate(['/cart']);
    this.router.navigateByUrl('', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/cart']);
   });
    
    //   }
    // }
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
    $("#totPrice").prop('value')[0];
  }

}
