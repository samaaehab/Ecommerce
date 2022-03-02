import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';
import { AdminTokenService } from './../../../services/admin-token.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { OrderService } from './../../../services/order.service';
import { ProductService } from './../../../services/product.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { ContactUS } from 'src/app/models/ContactUs';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  messages:any;
  contentMessage:any;
  name: any;
  searchText:any;
  p: any = 1;
  pcount: any = 5;
  contact=new ContactUS();
  usersCount:number=0;
  productsCount:number=0;
  categoriesCount:number=0;
  ordersCount:number=0;
  count: number = 0;
  messagesCount:number=0;
  counter:number=0;
  constructor(private userService: UserService, private productService: ProductService,
    private orderService: OrderService, private categoryService: CategoryServiceService,
    private token: AdminTokenService, private auth: AuthenService
    , private router: Router ,private _contact:ContactUsService) { }

  ngOnInit(): void {
    this.getmsg();

  this.categoryService.get().subscribe(
      (res:any)=>{
        this.categoriesCount=res.data.length;
      }
    )

    this.orderService.get().subscribe(
      (res:any)=>{
        this.ordersCount=res.data.length;
        for(let i = 0 ; i < this.ordersCount ; i++){
          if(res.data[i].status === 'pending'){
            this.count++;
          }
          
        }
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
    this._contact.get().subscribe(
      (res:any)=>{
        console.log(res);
        
        this.messagesCount=res.length;
        for(let i = 0 ; i < this.messagesCount ; i++){
          if(res[i].seen === 0){
            this.counter++;
          }

        }
      }
    );
  }

  getmsg() {
    this._contact.get().subscribe(
      (res:any)=>{
        console.log(res);
        this.messages=res;
  
        this.messagesCount=res.length;
        for(let i = 0 ; i < this.messagesCount ; i++){
          if(res[i].seen === 0){
            this.counter++;
          }
  
        }
      }
    );
  }
   view(id:any){
   this._contact.show(id).subscribe(
   (res:any)=>{
   this.name=res.name;
   this.contentMessage=res.message;
   this.contact.seen=1;
   this._contact.put(id,this.contact).subscribe(
     (res: any) => {
     this.getmsg();
       
   }
   )
   }
   );
   
   }


  logout(event:MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admin-acount');
  }  

}
