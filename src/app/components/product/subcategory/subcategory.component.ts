import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from 'src/app/models/Store';
import { StoreService } from 'src/app/services/store.service';
import { AppComponent } from 'src/app/app.component';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  products: any[] = [];
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';

  p: any = 1;
  count: any = 9;
  allStore: any[] = [];
  subcat="";
  total: number = 0;
  category="";
  productStore: any[] = [];
  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService, private storeService: StoreService, public myapp: AppComponent,
    private _subcatService:SubcategoryService
    ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      var subid = params.get('subid');
      var catid = params.get('catid');
      this._productService.getProductsForEachSubCategory(subid, catid).subscribe(
        (res: any) => {
          this.products = res;
          this._subcatService.show(Number(subid)).subscribe(
            (res:any)=>{
              this.subcat=res.data;
              this.category=res.data.category.cat_name;
              this.subcat=res.data.subcat_name;
            }
          )
        }
      );

    })
    window.scrollTo(0 , 0);
  }
addToFav(id:any,ProdName:any,Image:any,newPrice:any){
  if (localStorage.getItem('Fav' + id) === null) {
    localStorage.setItem('Fav' + id, ProdName + '#$' + Image + '#$' + newPrice + '#$' + id + '#$' + 1);
    this.myapp.successmessage(ProdName +" Added To Wish List Successfuly");
  } else {
    this.myapp.showWarning(ProdName +" Already Added Before","Oops");
  }

}
}




