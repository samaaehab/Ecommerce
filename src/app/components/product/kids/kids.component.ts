import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/Product';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  public allsubcategories:any[]=[];
  public subcategories:any[]=[];
  productsCategory:any[]=[];
  productStore:any[]=[];
  productColor:any[]=[];
  productSize:any[]=[];
  productStoreId:any[]=[];
  allStore:any[]=[];
  total:number=0;


  storeId:any[]=[];
  cart:any[]=[];
  user=localStorage.getItem('email');
  LastProducts:Product[]=[];
  allProducts: any[] = [];
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';

  price: any[] = [];
  p: any = 1;
  count: any = 9;
  searchText:any;
  constructor(private productService: ProductService, private storeService: StoreService, public header: HeaderComponent,
    private _SubcategoryService: SubcategoryService ,private _categoryService: CategoryServiceService, private _userService: UserService,
  public myapp:AppComponent) { }

  ngOnInit(): void {
    window.scrollTo(0 , 0);
    this.showcat();
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
        let x= res.data.find((cat:any)=>cat.cat_name=='kids' || cat.cat_name=='kid');
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
