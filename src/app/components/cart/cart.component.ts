import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 user=localStorage.getItem('email');
products:any[]=[];
productsInCart:any[]=[];
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++) {
      let a=localStorage.key(i);
      if(a?.substring(0,7)=='product'){
        let products=localStorage.getItem(a);
        let splitProduct=products?.split('#$');
        this.productsInCart.push(splitProduct);
        console.log(this.productsInCart[0][0]);
        
        
      }
      
  }
   
  
  function omg() {
      localStorage.clear();
  }
  }
}
