import { SubcategoryService } from './../../services/subcategory.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { SubCategory } from 'src/app/models/SubCategory';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {
  LastProducts:Product[]=[];

  allProducts: any[] = [];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  

  constructor(private _productService:ProductService,private _SubcategoryService:SubcategoryService) { }



  ngOnInit(): void {

    // this._productService.get().subscribe(
    //   (res: any) => {
    //     console.log(JSON.stringify(res));
    //     this.products = res.data;
    //   }
    // );

    

    this._SubcategoryService.get().subscribe(
    (res: any) => {
      for(const i in res.data){
        const id= res.data[i].id;
        this._productService.getForEachCategory(id).subscribe(
          (res:any)=>{
            this.LastProducts=res.data;

            for(let i=0;i<this.LastProducts.length;i++){
             this.allProducts.push(this.LastProducts[i]) ;
               
               
            }
            

          },
          (err:any)=>{
            console.log(err);
            
          }
        )
      }
      
    }
  );
    
  }
  getid(id:number){
    this.allProducts.forEach(
      c=>{
        if(c.id == id){
          $("#exampleModalLabel1").html(c?.product_name);
          $("#exampleModalLabel2").html(c?.description);


        }
      }
    );
    
  }
  

}


