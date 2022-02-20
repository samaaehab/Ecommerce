import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  productsCategory:any[]=[];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  price:any[]=[];
  constructor(private productService:ProductService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.productService.getProductsCategory(3).subscribe(
      (res: any) => {
        this.productsCategory.push(res);
        this.productsCategory=this.productsCategory[0];
        
      }
    );

    this.getPrice();
  }
 
   
 getPrice(){
  this.storeService.get().subscribe(
       (res:any)=>{
 for(let i in res.data){
   
     this.price.push(res.data[i]);
   
   
 }
  
       
 },
     (error:any)=>{

     }
  );

  
   console.log(this.price);
} 



}
