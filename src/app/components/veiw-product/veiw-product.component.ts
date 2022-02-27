import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-veiw-product',
  templateUrl: './veiw-product.component.html',
  styleUrls: ['./veiw-product.component.css']
})
export class VeiwProductComponent implements OnInit {
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  prodid:any;
  productCat:any[]=[];
  store:any[]=[];

  productDet:any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,private storeService: StoreService, public myapp: AppComponent) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.prodid = params.get('pId');

      this._productService.show(this.prodid).subscribe(
        (res: any) => {
          this.productDet=res.data;
          console.log(this.productDet);
          let catId=res.data.category.id;

          // console.log(catId);

          this._productService.getProductsCategory(catId).subscribe(
            (res: any) => {
              // console.log(res);
      
              this.productCat=res;
              console.log(this.productCat);

            },(error:any)=>{
              console.log(error);
            }
            
      
          );
            
        },(error:any)=>{
          console.log(error);
        }
        

      );
    });


    this.getStore();
    
  }
  getStore(){
    this.storeService.get().subscribe(
         (res:any)=>{
   for(let i in res.data){

     if(res.data[i].product_id==this.productDet.id)
       this.store.push(res.data[i]);
        
   } 
   },
       (error:any)=>{
 
       }
    );
 
    
     console.log(this.store);
  }
  addToFav(id:any,ProdName:any,Image:any,newPrice:any){
    // let id = $("#id").prop('value');
    // localStorage.setItem('product_name' + id,ProdName);
    // localStorage.setItem('image' +id,Image);
    // localStorage.setItem('quantity' +id,'1');
    if (localStorage.getItem('Fav' + id) === null) {
      localStorage.setItem('Fav' + id, ProdName + '#$' + Image + '#$' + newPrice + '#$' + id + '#$' + 1);
      this.myapp.successmessage(ProdName +" Added To Wish List Successfuly");
    } else {
      this.myapp.showWarning(ProdName +" Already Added Before","Oops"); 
    }
  }
  
}
