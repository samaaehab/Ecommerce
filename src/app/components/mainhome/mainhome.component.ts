import { SubcategoryService } from './../../services/subcategory.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { SubCategory } from 'src/app/models/SubCategory';
import { UserService } from 'src/app/services/user.service';
import { StoreService } from 'src/app/services/store.service';
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

  allProducts: any[] = [];
  store:Store[]=[];
  storeId:any[]=[];
  cart:any[]=[];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  user=localStorage.getItem('email');


  constructor(public myapp: AppComponent,private _productService:ProductService,private _SubcategoryService:SubcategoryService,private _userService:UserService,private storeService:StoreService) { }



  ngOnInit(): void {

    this._SubcategoryService.get().subscribe(
    (res: any) => {
      for(const i in res.data){
        const id= res.data[i].id;
        this._productService.getForEachSubCategory(id).subscribe(
          (res:any)=>{
            this.LastProducts=res.data;

            for(let i=0;i<this.LastProducts.length;i++){
             this.allProducts.push(this.LastProducts[i]) ;
               console.log(this.allProducts);
            }


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
  getid(id:number){
    this.allProducts.forEach(
      c=>{
        if(c.id == id){
          $("#exampleModalLabel1").html(c?.product_name);
          $("#exampleModalLabel2").html(c?.description);
          // $("#exampleModalLabel3").html(c?.src);
          $("#exampleModalLabel3").attr(c?.src);

          // for(let s of this.size){
          //   console.log(s.size) ;
        
          // }

        }
      }
    );
    

  }


  
  // getidS(id:number){
  //   this.store.forEach(
  //     c=>{
  //       if(c.id == id){
  //         $("#exampleModalLabel5").html(c?.size);
  //         $("#exampleModalLabel6").html(c?.color);
  //         // $("#exampleModalLabel3").html(c?.src);
  //         // $("#exampleModalLabel3").prop(c?.src);

  //         for(let s of this.size){
  //          console.log(s.size) ;
       
  //        }
  //       }
  //     }
  //   );

  // }
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
getSize(){
  this.storeService.get().subscribe(
       (res:any)=>{
 for(let i in res.data){
   
     this.size.push(res.data[i]);
   
   
   
 }
  
       
 },
     (error:any)=>{

     }
  );

  
   console.log(this.size);
}

       }

      
