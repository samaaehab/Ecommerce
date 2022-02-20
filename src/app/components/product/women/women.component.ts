import { StoreService } from './../../../services/store.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  productsCategory:any[]=[];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  price: any[] = [];
  p: any = 1;
  count: any = 9;
  searchText:any;
  constructor(private productService:ProductService,private storeService:StoreService) { }


  ngOnInit(): void {

    this.productService.getProductsCategory(2).subscribe(
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
