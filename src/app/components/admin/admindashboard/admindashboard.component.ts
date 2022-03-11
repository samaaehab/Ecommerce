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
  counter: number = 0;
  WeatherData:any;
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

      
    this.WeatherData = {
 	 	main : {},
 	 	isDay: true
 	 	};
 	 	this.getWeatherData();
 	 	console.log(this.WeatherData);
  }

  getmsg() {
    this._contact.get().subscribe(
      (res:any)=>{
        // console.log(res);
        this.messages=res;
  
        this.messagesCount=res.length;
        // for(let i = 0 ; i < this.messagesCount ; i++){
        //   if(res[i].seen === 0){
        //     this.counter++;
        //   }
  
        // }
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
  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=sohag&appid=9c57a2635e1987d71a704765bfb30352')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
    }
     
    setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    }
}
