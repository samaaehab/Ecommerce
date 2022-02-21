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
    
    
    constructor(private _userService: UserService, private router:Router) { }

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        let products = localStorage.getItem(a);
      
        let splitProduct = products?.split('#$');
        this.productsInCart.push(splitProduct);
        console.log(this.productsInCart);
        
        
      }
      
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
}
