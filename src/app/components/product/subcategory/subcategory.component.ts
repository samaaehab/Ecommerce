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
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
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
          console.log(this.products);

          this._subcatService.show(Number(subid)).subscribe(
            (res:any)=>{
              this.subcat=res.data;
              console.log(this.subcat);
              this.category=res.data.category.cat_name;
              this.subcat=res.data.subcat_name;
              console.log( this.category);
              console.log( this.subcat);

              

            }
          )
            
        }
      );
        
    })

    // this.storeService.get().subscribe(
    //   (res: any) => {
    //     for (let i in res.data) {
  
    //       this.productStore.push(res.data[i]);
  
  
    //     }
    //     console.log(this.productStore);
    //   },
    //   (error: any) => {
  
    //   }
  
    // );
  }

  // getid(id: number) {
  //   this.products.forEach(
  //     c => {
  //       if (c.id == id) {
  //         var img = this.imagepath + c.image;
  //         this.total = c.price - c.discount;
  //         $("#exampleModalLabel1").html(c?.product_name);
  //         $("#exampleModalLabel11").prop('value', c?.id);
  //         $("#exampleModalLabel2").html(c?.description);
  //         $("#exampleModalLabel4").html(String(this.total));
  
  //         $("#exampleModalLabel3").prop('src', img);
  //         // $("#exampleModalLabel3").prop('src')=c?.src;
  //         // console.log(this.imagepath+c.image);
  
  //         for (let i = 0; i < this.productStore.length; i++) {
  //           if (id == this.productStore[i].product_id) {
  //             // this.productStoreId.push(this.productStore[i].id);
  //             // this.productSize.push(this.productStore[i].size);
  //             // this.productColor.push(this.productStore[i].color);
  //             this.allStore.push(this.productStore[i]);
  
  //           }
        
  //         }
  
  //         ;
          
  
  
  
  //       }
  //     }
  //   );
  
  
  // }
  // closeModel() {
  
   
  //   this.allStore = [];
  // }
//   addToCart(id: any, productSizeColor: any) {
//     this._activatedRoute.paramMap.subscribe(params => {
//       var subid = params.get('subid');
//       var catid = params.get('catid');
//       this._productService.getProductsForEachSubCategory(subid, catid).subscribe(
//         (res: any) => {
//           for (let p in res.data) {
//             this.products.push(res.data[p]);
         
//           }
        
//           var product = this.products.find((p: any) => p.id == id);
//           if (localStorage.getItem('product' + productSizeColor) === null) {
//             let price = product.price - product.discount;
//             localStorage.setItem('product' + productSizeColor, product.id + "#$" + product.product_name + "#$" + this.imagepath + product.image + "#$" + 1 + "#$" + price + "#$" + productSizeColor + "#$" + price);
//             this.myapp.successmessage(product.product_name + " Added To Cart Successfuly");
//           }
//           else {
//             this.myapp.showWarning(product.product_name + " Already Added Before", "Oops");
    
    
//           }
    
//         }
    
//       );
//     });
// }

addToFav(id:any,ProdName:any,Image:any,newPrice:any){
  // let id = $("#id").prop('value');
  // localStorage.setItem('product_name' + id,ProdName);
  // localStorage.setItem('image' +id,Image);
  // localStorage.setItem('quantity' +id,'1');
  localStorage.setItem('Fav' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + 1);
  this.myapp.successmessage("Added To Wish List Successfuly"); 

}
}




