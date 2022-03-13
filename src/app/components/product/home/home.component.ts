import { ActivatedRoute } from '@angular/router';
import { StoreService } from './../../../services/store.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public allsubcategories:any[]=[];
public subcategories:any[]=[];
men="assets/img/retro-man-dressed-shirt-lies-floor-posing.jpg";
women="assets/img/Banner1.jpg";
kids="assets/img/WhatsApp Image 2022-02-10 at 9.53.55 PM.jpeg";
cat:any;
subcat:any[]=[];
productsCategory:any[]=[];
storeId:any[]=[];
cart:any[]=[];
user=localStorage.getItem('email');
LastProducts:Product[]=[];
allProducts: any[] = [];
  categories: Category[] = [];
  catname: any[] = [];
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';

  price:any[]=[];
  p: any = 1;
  count: any = 9;
  searchText: any;
  productStore:any[]=[];
  productColor:any[]=[];
  productSize:any[]=[];
  productStoreId:any[]=[];
  allStore:any[]=[];
  total:number=0;
  constructor(private _activatedRoute:ActivatedRoute,private productService: ProductService, private storeService: StoreService, private _SubcategoryService: SubcategoryService, private _categoryService: CategoryServiceService, private _userService: UserService
  ,public myapp:AppComponent) { }

  ngOnInit(): void {

    this.showcat();
    window.scrollTo(0 , 0);
    // this._activatedRoute.paramMap.subscribe(params=>{
    //   this.cat=params.get('cat');

    // })
 
  }

products:any[]=[];

  addToFav(id:any,ProdName:any,Image:any,newPrice:any){
    if (localStorage.getItem('Fav' + id) === null) {
      localStorage.setItem('Fav' + id, ProdName + '#$' + Image + '#$' + newPrice + '#$' + id + '#$' + 1);
      this.myapp.successmessage(ProdName +" Added To Wish List Successfuly");
    } else {
      this.myapp.showWarning(ProdName +" Already Added Before","Oops");
    }


  }

  showcat() {
    this._categoryService.get().subscribe(
      (res: any) => {
        for (let i in res.data) {
          this.categories.push(res.data[i]);
        }
        for (let c in this.categories) {
          this.catname.push(this.categories[c].cat_name)
        }
        let x= res.data.find((cat:any)=> cat.cat_name ==='men'|| cat.cat_name==='man');
        this.productService.getProductsCategory(x.id).subscribe(
          (res: any) => {
            this.productsCategory.push(res);
            this.productsCategory=this.productsCategory[0];
          }
        );

        for(const i in res.data){
          const id= res.data[i].id;
          this._SubcategoryService.getSubCatForEachCategory(id).subscribe(
            (res:any)=>{
              this.subcategories=res.data;

                    this.allsubcategories.push(this.subcategories.map(m=>{return m}));
               },
            (err:any)=>{
            }
          )
        }
      }
    );
}
}
