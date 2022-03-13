import { SubcategoryService } from './../../services/subcategory.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { AppComponent } from 'src/app/app.component';
import { Store } from 'src/app/models/Store';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {
  LastProducts:Product[]=[];

  size:any[]=[];
mainhomeRate=4;
  allProducts: any[] = [];
  store:Store[]=[];
  storeId:any[]=[];
  cart:any[]=[];
  productStore:any[]=[];
  productColor:any[]=[];
  productSize:any[]=[];
  productStoreId:any[]=[];
  allStore:any[]=[];
  productsDisc:any[]=[];
  total:number=0;
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';
  user=localStorage.getItem('email');


  constructor(public myapp: AppComponent,private _productService:ProductService,private _SubcategoryService:SubcategoryService) { }


  ngOnInit(): void {
    window.scrollTo(0 , 0);
    this.productdiscount();
    this.last2prod();
}

  onmainHomeRateChange(rate:number):void{
this.mainhomeRate=rate;
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

productdiscount() {
    this._productService.getProductWithBigDiscount().subscribe(
      (res:any)=>{
       this.productsDisc=res;
      }
    )
}
  last2prod() {
    this._SubcategoryService.get().subscribe(
      (res: any) => {
        for(const i in res.data){
          const id= res.data[i].id;
          this._productService.getForEachSubCategory(id).subscribe(
            (res:any)=>{
              this.LastProducts=res.data;

              for(let i=0;i<this.LastProducts.length;i++){
               this.allProducts.push(this.LastProducts[i]) ;
              }
            },
            (err:any)=>{
            }
          )
        }
      }
    );
}
 }


