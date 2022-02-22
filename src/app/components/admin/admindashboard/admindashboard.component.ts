import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AdminTokenService } from './../../../services/admin-token.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { OrderService } from './../../../services/order.service';
import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  usersCount:number=0;
  productsCount:number=0;
  categoriesCount:number=0;
  ordersCount:number=0;
  constructor(private userService:UserService,private productService:ProductService,private orderService:OrderService,private categoryService:CategoryServiceService,private token:AdminTokenService,private auth:AuthenService,private router:Router) { }

  ngOnInit(): void {
  this.categoryService.get().subscribe(
      (res:any)=>{
        this.categoriesCount=res.data.length;
      }
    )

    this.orderService.get().subscribe(
      (res:any)=>{
        this.ordersCount=res.data.length;
      }
    )

    this.productService.get().subscribe(
      (res:any)=>{
        this.productsCount=res.data.length;
      }
    )

    this.userService.get().subscribe(
      (res:any)=>{
        this.usersCount=res.data.length;
      }
    )
  }

  logout(event:MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admin-acount');
  }
    

}
