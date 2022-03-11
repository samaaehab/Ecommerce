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
mainhomeRate=4;
  allProducts: any[] = [];
  store:Store[]=[];
  storeId:any[]=[];
  cart:any[]=[];
  productStore:any[]=[];
  productColor:any[]=[];
  productSize:any[]=[];
  productStoreId:any[]=[];
  allStore:any[]=[];
  productsDisc:any[]=[];
  total:number=0;
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';
  user=localStorage.getItem('email');


  constructor(public myapp: AppComponent,private _productService:ProductService,private _SubcategoryService:SubcategoryService,private _userService:UserService,private storeService:StoreService) { }


  ngOnInit(): void {

    this.productdiscount();
    this.last2prod();

//   this.storeService.get().subscribe(
//     (res:any)=>{
//   for(let i in res.data){

//   this.productStore.push(res.data[i]);


// }

// },
//   (error:any)=>{

//   }
// );

  // this.getIdByEmail();
  // this.getStoreId();
  // this.getStore()
  // this.closeModel();

}

  // getStore(){
  //   this.storeService.get().subscribe(
  //        (res:any)=>{
  //  for(let i in res.data){

  //      this.productStore.push(res.data[i]);

  //  }

  //  },
  //      (error:any)=>{

  //      }
  //   );


  //    console.log(this.productStore);
  // }

  onmainHomeRateChange(rate:number):void{
this.mainhomeRate=rate;
  }
  // getid(id:number){

  //   this.allProducts.forEach(
  //     c=>{
  //       if(c.id == id){
  //         var img=this.imagepath+c.image;
  //          this.total=c.price - c.discount;
  //         $("#exampleModalLabel1").html(c?.product_name);
  //         $("#exampleModalLabel11").prop('value',c?.id);
  //         $("#exampleModalLabel2").html(c?.description);
  //         $("#exampleModalLabel4").html(String(this.total));

  //         $("#exampleModalLabel3").prop('src',img);
  //         // $("#exampleModalLabel3").prop('src')=c?.src;
  //         // console.log(this.imagepath+c.image);

  //         for(let i=0;i<this.productStore.length;i++){
  //          if(id==this.productStore[i].product_id){
  //           this.productStoreId.push(this.productStore[i].id);
  //           this.productSize.push(this.productStore[i].size);
  //           this.productColor.push(this.productStore[i].color);
  //           this.allStore.push(this.productStore[i]);

  //          }

  //         }

  //         console.log(this.productSize);
  //         console.log(this.productColor);
  //         console.log( this.allStore);



  //       }
  //     }
  //   );


  // }

// closeModel(){

//   this.productSize=[];
//   this.productColor=[];
//   this.productStoreId=[];
//   this.allStore=[];
// }

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
// getIdByEmail(){
// this._userService.get().subscribe(
//   (res: any) => {
//    let c= res.data.find((user:any)=>user.email==this.user);
//    console.log(c.id);
//    return c.id;

//   },
//   (err:any)=>{
//     console.log(err);
//   }
// );
// }
//id:any,ProdName:any,Image:any,newPrice:any
products:any[]=[];
// addToCart(id:any,productSizeColor:any){
// this._productService.get().subscribe(
//   (res:any)=>{
//     for(let p in res.data){
//       this.products.push(res.data[p]);

//     }

//     var product=this.products.find((p:any)=>p.id == id);
//     if(localStorage.getItem('product'+productSizeColor)=== null){
//     let price=product.price-product.discount;
//     localStorage.setItem('product'+productSizeColor,product.id+"#$"+product.product_name+"#$"+this.imagepath+product.image+"#$"+1+"#$"+price+"#$"+productSizeColor+"#$"+price);
//     // if(localStorage.getItem('product'+productSizeColor)=='product'){
//     //   localStorage.removeItem('product');
//     //   this.myapp.errormessage("Sorry not Available");
//     // }
//     this.myapp.successmessage(product.product_name+" Added To Cart Successfuly");
//   }
//     else{
//       this.myapp.showWarning(product.product_name+" Already Added Before","Oops");

//     }

//   }
// );
// //   let message="";
// //  console.log(id);
// //  localStorage.setItem('product' + id,ProdName + '#$' + Image + '#$' +newPrice + '#$' + id + '#$' + 1);
// //  this.myapp.successmessage("Added To Cart Successfuly");
// }
// getStoreId(){
//   this.storeService.get().subscribe(
//     (res: any) => {
//       console.log(res.data)
//  for(let i in res.data){

//    this.storeId.push(res.data[i].id);

//  }

// console.log(this.storeId);

// //  console.log(res.data[0].id);

//  },
//      (error:any)=>{

//      }
//   );

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
  productdiscount() {
    this._productService.getProductWithBigDiscount().subscribe(
      (res:any)=>{
       // console.log(res);
       this.productsDisc=res;
       // console.log(this.productsDisc);
      }
    )
}
  last2prod() {
    this._SubcategoryService.get().subscribe(
      (res: any) => {
        for(const i in res.data){
          const id= res.data[i].id;
          this._productService.getForEachSubCategory(id).subscribe(
            (res:any)=>{
              this.LastProducts=res.data;

              for(let i=0;i<this.LastProducts.length;i++){
               this.allProducts.push(this.LastProducts[i]) ;
                //  console.log(this.allProducts);
              }


            },
            (err:any)=>{
              // console.log(err);

            }
          )
        }


      }
    );
}
 }


