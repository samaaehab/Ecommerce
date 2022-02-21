import { SubcategoryService } from './../../services/subcategory.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { SubCategory } from 'src/app/models/SubCategory';
import { UserService } from 'src/app/services/user.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {
  LastProducts:Product[]=[];

  allProducts: any[] = [];
  storeId:any[]=[];
  cart:any[]=[];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  user=localStorage.getItem('email');


  constructor(private _productService:ProductService,private _SubcategoryService:SubcategoryService,private _userService:UserService,private storeService:StoreService) { }



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


