import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { SubCategory } from 'src/app/models/SubCategory';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { AuthenService } from './../../services/authen.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
// import { TranslateService } from '@ngx-translate/core';

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
 public subcategories:any[]=[];
 user=localStorage.getItem('email');
 count:any=0;
 categories:Category[]=[];
  public logged = false;
  totalPrice: number = 0;
  productsInCart: any[] = [];
constructor(private _SubcategoryService:SubcategoryService,
private _categoryService:CategoryServiceService,
private auth:AuthenService,private router:Router,private token:TokenService) { }
searchText:any;
productCount:any;
WeatherData:any;
  // constructor(
  //   public translate: TranslateService
  // ) {
  //   translate.addLangs(['en', 'ar']);
  //   translate.setDefaultLang('en');
  // }
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }


  ngOnInit(): void {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
    for (var i = 0; i < localStorage.length; i++) {
      let a = localStorage.key(i);
      if (a?.substring(0, 7) == 'product') {
        let products = localStorage.getItem(a);

        let splitProduct = products?.split('#$');
        this.productsInCart.push(splitProduct);
        // console.log(this.productsInCart);
        // this.cartCount=this.productsInCart.length;



      }
    }
    for (var i = 0; i < this.productsInCart.length; i++) {

      this.totalPrice+=Number(this.productsInCart[i][6]);
 
     }
 
    this.auth.status.subscribe(value=>this.logged=value);
      this._categoryService.get().subscribe(
        (res: any) => {
               // get category data
              //  console.log(JSON.stringify(res));
               this.categories = res.data;
              //  console.log(this.categories);
               //
          
        // console.log(res.data);
          for (const i in res.data) {
           
            const id= res.data[i].id;
            this._SubcategoryService.getSubCatForEachCategory(id).subscribe(
              (res: any) => {
           
                this.subcategories=res.data;

                // console.log(this.subcategories);

                      this.allsubcategories.push(this.subcategories.map(m=>{return m}));

                    // for(let i=0;i<res.data.length;i++){
                    //   this.subcategories.push(res.data[i])
                    //   this.subcategories=this.subcategories.map(m=>{return m});

                    // }
                 },
              (err:any)=>{
                console.log(err);

              }
            )
          }
          // console.log(this.allsubcategories);
          


        }
      );
    this.cartCount();
    // this.getCategoryData();
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
      cartCount(){
        for(let i =0;i<localStorage.length;i++){
          let a = localStorage.key(i);
          if (a?.substring(0, 7) == 'product') {
            this.count++;
            // console.log(a?.substring(0, 7));

            console.log('yes');
          }
        }
          
        return this.count;

      }
      // getCategoryData(){ 
      //   this._categoryService.get().subscribe(
      //    (res: any) => {
      //      console.log(JSON.stringify(res));
      //       this.categories = res.data;
      //       console.log(this.categories);
            
      //    }
      //  );
      // }
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


