import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

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
    
    
  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute)
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
    
    console.log(this.cartCount);
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
}
