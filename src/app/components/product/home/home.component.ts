import { StoreService } from './../../../services/store.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public allsubcategories:any[]=[];
public subcategories:any[]=[];
subcat:any[]=[];
productsCategory:any[]=[];
storeId:any[]=[];
  cart:any[]=[];
  user=localStorage.getItem('email');
  LastProducts:Product[]=[];
  allProducts: any[] = [];
imagepath: any = 'http://127.0.0.1:8000/public/image/';
price:any[]=[];
  p: any = 1;
  count: any = 9;
  searchText:any;
  constructor(private productService: ProductService, private storeService: StoreService, private _SubcategoryService: SubcategoryService, private _categoryService: CategoryServiceService, private _userService: UserService
  ,public myapp:AppComponent) { }

  ngOnInit(): void {

    this.productService.getProductsCategory(1).subscribe(
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
addToCart(id:any,ProdName:any,Image:any,newPrice:any){

  let message="";
 console.log(id);
 localStorage.setItem('product' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + 1);
 this.myapp.successmessage("Added To Cart Successfuly"); 

  
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

  addToFav(id:any,ProdName:any,Image:any,newPrice:any){
    // let id = $("#id").prop('value');
    // localStorage.setItem('product_name' + id,ProdName);
    // localStorage.setItem('image' +id,Image);
    // localStorage.setItem('quantity' +id,'1');
  localStorage.setItem('Fav' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + 1);
 this.myapp.successmessage("Added To Wish List Successfuly"); 
  
  
  }
  
}
