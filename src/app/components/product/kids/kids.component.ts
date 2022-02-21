import { Component, OnInit } from '@angular/core';
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

  storeId:any[]=[];
  cart:any[]=[];
  user=localStorage.getItem('email');
  LastProducts:Product[]=[];
  allProducts: any[] = [];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  price: any[] = [];
  p: any = 1;
  count: any = 9;
  searchText:any;
  constructor(private productService: ProductService, private storeService: StoreService, public header: HeaderComponent,
    private _SubcategoryService:SubcategoryService,private _categoryService:CategoryServiceService,private _userService:UserService) { }

  ngOnInit(): void {
    this.productService.getProductsCategory(3).subscribe(
      (res: any) => {
        this.productsCategory.push(res);
        this.productsCategory=this.productsCategory[0];
        
      }
    );

    this.getPrice();
    this._categoryService.get().subscribe(
      (res: any) => {
        for(const i in res.data){
          const id= res.data[i].id;
          this._SubcategoryService.getSubCatForEachCategory(id).subscribe(
            (res:any)=>{
              this.subcategories=res.data;
              console.log(this.subcategories);
              
                    this.allsubcategories.push(this.subcategories.map(m=>{return m}));

                  // for(let i=0;i<res.data.length;i++){
                  //   this.subcategories.push(res.data[i])
                  //   this.subcategories=this.subcategories.map(m=>{return m});

                  // }
               },
            (err:any)=>{
              console.log(err);
              
            }
          )
        }
        
      }
    ); 
    this.getIdByEmail();
    this.getStoreId();

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
getIdByEmail(){
this._userService.get().subscribe(
(res: any) => {
 let c= res.data.find((user:any)=>user.email==this.user);
 console.log(c.id);
 return c.id;

},
(err:any)=>{
  console.log(err);
}
);
}
addToCart(id:any,ProdName:any,Image:any){
// let id = $("#id").prop('value');
// localStorage.setItem('product_name' + id,ProdName);
// localStorage.setItem('image' +id,Image);
// localStorage.setItem('quantity' +id,'1');
localStorage.setItem('product' + id,ProdName + '#$' + Image + '#$' + 1);


}
getStoreId(){
this.storeService.get().subscribe(
     (res:any)=>{
for(let i in res.data){

   this.storeId.push(res.data[i].id);

}
console.log(this.storeId);

//  console.log(res.data[0].id);

},
   (error:any)=>{

   }
);

  }



}
