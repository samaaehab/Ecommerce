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
  x=0;
  prodid:any;
  productCat:any[]=[];
  store:any[]=[];
  mainhomeRate=4;
  check:boolean=false;
  productDet:any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,private storeService: StoreService, public myapp: AppComponent) { }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe(params => {
      this.prodid = params.get('pId');
      this.show(this.prodid);
      this.storeService.get().subscribe(
        (res:any)=>{
          for(let i in res.data){

            if(res.data[i].product_id==this.productDet.id)
              this.store.push(res.data[i]);
              console.log(this.store.length);
              
            if(this.store.length === 0){
              this.check=true;
            }else{
              this.check=false;
            }
          } 
          },
          (error:any)=>{

        }
      );
      
    });
    
  }
  products:any[]=[];
  show(id:any){
    this._productService.show(id).subscribe(
      (res: any) => {
        this.productDet=res.data;
        let catId=this.productDet.category.id;
        this._productService.getProductsCategory(catId).subscribe(
          (res: any) => {
            this.productCat=res;
          },(error:any)=>{
            console.log(error);
          }
        ); 
      },(error:any)=>{
        console.log(error);
      } 
    );
  }

addToCart(id:any,productSizeColor:any,qnt:any){
  this._productService.get().subscribe(
    (res:any)=>{
      for(let p in res.data){
        this.products.push(res.data[p]);
       
      } 
      
      var product=this.products.find((p:any)=>p.id == id);
      if(localStorage.getItem('product'+productSizeColor)=== null){
      let price=product.price-product.discount;
      localStorage.setItem('product'+productSizeColor,product.id+"#$"+product.product_name+"#$"+this.imagepath+product.image+"#$"+qnt+"#$"+price+"#$"+productSizeColor+"#$"+price);
      // if(localStorage.getItem('product'+productSizeColor)=='product'){
      //   localStorage.removeItem('product');
      //   this.myapp.errormessage("Sorry not Available");
      // }
      this.myapp.successmessage(product.product_name+" Added To Cart Successfuly"); 
    }
      else{
        this.myapp.showWarning(product.product_name+" Already Added Before","Oops"); 
  
  
      }
  
    } 
  
  );
  }

  onmainHomeRateChange(rate:number):void{
    this.mainhomeRate=rate;
      }
  // getStore(){
   
 
    
     
  // }
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
