import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 user=localStorage.getItem('email');
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    
  }

}
