import { UserService } from './../../services/user.service';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { AuthenService } from './../../services/authen.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  static next(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
allsubcategories:any[]=[];
 public subcategories:any[]=[]
 categories:Category[]=[];
  public logged = false;
  totalPrice: number = 0;
  productsInCart: any[] = [];
  user=localStorage.getItem('email');
constructor(
private _categoryService:CategoryServiceService,
private auth:AuthenService,private router:Router,private token:TokenService,private _userService:UserService,private _cartService:CartService) { }
searchText:any;
productCount:any;
WeatherData:any;


  ngOnInit(): void {

    this.getauthlogin();
    this.getloginUser();
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();

    this.auth.status.subscribe(value => this.logged = value);

    this._categoryService.get().subscribe(
        (res: any) => {
               this.categories = res.data;
        },
            (err:any)=>{
            }
      );
      }
      getTotalCount() {
        return this._cartService.cartCount();
      }
      getloginUser(){
        return this._userService.loginUser();
      }
      gettotalPrice(){
        return this._cartService.totalPrice();
      }
  getauthlogin() {
   return this._userService.authlogin();
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/acount');
    localStorage.removeItem('email');
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        localStorage.removeItem(a?.substring(0, 7)+a?.substring(7));
      }
      if (a?.substring(0, 3) == 'Fav') {
        localStorage.removeItem(a?.substring(0, 3)+a?.substring(3));
      }
    }
  }

      users:any;
      getWeatherData(){
        this._userService.get().subscribe(
          (res: any) => {
            this.users = res.data.find((user: any) => user.email == this.user);
            fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.users.city+'&appid=9c57a2635e1987d71a704765bfb30352')
            .then(response=>response.json())
            .then(data=>{this.setWeatherData(data);})
          }
        );

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


