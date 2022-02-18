import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Product } from './../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import  Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { Store } from './../../../models/Store';
import { StoreService } from './../../../services/store.service';


@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
  products:Product[]=[];
  subcategories:SubCategory[]=[];
  stores:Store[]=[];
  // Pagination parameters.
  p: any = 1;
  count: any = 3;
  p1: any = 1;
  count1: any = 3;
  searchText:any;
  id:any;
  product =new Product();
  store =new Store();
  constructor(private _productService: ProductService, private _SubcategoryService: SubcategoryService,private _StoreService:StoreService,
    public myapp: AppComponent) { }

 ngOnInit(): void {
   this._productService.get().subscribe(
     (res: any) => {
      //  console.log(JSON.stringify(res));
       this.products = res.data;
       console.log(this.products);
       
     }
   );
   this._SubcategoryService.get().subscribe(
    (res: any) => {
      console.log(JSON.stringify(res));
      this.subcategories = res.data;
    }
  );
  this._StoreService.get().subscribe(
    (res: any) => {
      this.stores = res.data;
      console.log(this.stores);
    }
  );
 }

//  add(product_name:string,description:string,subcat_id:any,price:any,discount:any,color:string,size:string):void{
//    let product = new Product();
//    let store =  new Store();
//    product.product_name=product_name;
//   //  product.image=image;
//    product.description=description;
//    product.subcat_id=subcat_id;
//    store.price=price;
//    store.discount=discount;
//    store.color=color;
//    store.size=size;


//    this._productService.post(product).subscribe(
//     (response:any)=>{
//       this.products.push(product);
//       // console.log(product.id);
//       console.log(response.data.product_name);
      
//       // window.location.reload();
//       this.myapp.successmessage(response.message);
//     },
//     (error: any) => {
//      for (const err in error.error.errors) {
//        for (let i = 0; i < error.error.errors[err].length; i++){
//          console.log(error.error.errors[err][i]);
//          this.myapp.errormessage(error.error.errors[err][i]);
//        }

//      }
//     }
//   );
  // store.product_id=product.id;
  // console.log(store.product_id);
  // this._StoreService.post(store).subscribe(
  //   (response:any)=>{
  //     this.stores.push(store);
  //     window.location.reload();
  //     this.myapp.successmessage(response.message);
  //   },
  //   (error: any) => {
  //    for (const err in error.error.errors) {
  //      for (let i = 0; i < error.error.errors[err].length; i++){
  //        console.log(error.error.errors[err][i]);
  //        this.myapp.errormessage(error.error.errors[err][i]);
  //      }

  //    }
  //   }
  // );

//  files:any;
//  uploadImage(event:any){
//   this.files=event.target.files[0];
//   console.log(this.files);
  
//  }
 add(product_name:string,description:string,subcat_id:any):void{

   this.product.product_name=product_name;
   this.product.description=description;
   this.product.subcat_id=subcat_id;
  //  const formdata=new FormData();
  // formdata.append('product_name',product_name);
  // formdata.append('description',description);
  // formdata.append('subcat_id',subcat_id);
  // formdata.append('image',this.files,this.files.name);
  //  console.log(formdata);
   this._productService.post(this.product).subscribe(
     (response:any)=>{
       this.products.push(this.product); 
       window.location.reload();
       this.myapp.successmessage(response.message);
       
     },
     (error: any) => {
      for (const err in error.error.errors) {
        for (let i = 0; i < error.error.errors[err].length; i++){
          console.log(error.error.errors[err][i]);
          this.myapp.errormessage(error.error.errors[err][i]);
        }
        
      }
     }
   );
  

 }
 deleteFeature(index:number):void
 {
   let store=this.stores[index];
   this._StoreService.delete(store.id)
   .subscribe(
    (response: any) => {
      console.log(store);

      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {

        if (result.isConfirmed) {
          // console.log('Clicked Yes, File deleted!');
          this.products.splice(index, 1);
          window.location.reload();
          this.myapp.successmessage(response.message);

        } else if (result.isDismissed) {
          // console.log('Clicked No, File is safe!');
          this.myapp.errormessage("product not Deleted");


        }
      })

    },
    (error:any)=>{}
  );


 }
 delete(index:number):void
 {
   let product=this.products[index];
   this._productService.delete(product.id)
   .subscribe(
    (response: any) => {
      console.log(product);

      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this item',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {

        if (result.isConfirmed) {
          // console.log('Clicked Yes, File deleted!');
          this.products.splice(index, 1);
          // window.location.reload();
          this.myapp.successmessage(response.message);

        } else if (result.isDismissed) {
          // console.log('Clicked No, File is safe!');
          this.myapp.errormessage("product not Deleted");


        }
      })

    },
    (error:any)=>{}
  );


 }
 edit(id:number){

   this.products.forEach(
     c=>{
       if(c.id == id){
         $("#uppid").prop('value',c?.id);
         $("#productName").prop('value',c?.product_name);
         $("#description").prop('value',c?.description);
       }
     }
   );

 }

 getId(id:number){
  this.products.forEach(
    c=>{
      if(c.id == id){
        $("#productId").prop('value',c?.id);
      }
    }
  );
 }

 addFeature(id:any,color:string,size:string,price:any,discount:any){
  this.store.product_id=id;
  this.store.color=color;
  this.store.size=size;
  this.store.price=price;
  this.store.discount=discount;
  this._StoreService.post(this.store).subscribe(
    (res: any) => {
      this.stores.push(this.store);
      window.location.reload();
      this.myapp.successmessage(res.message);
    }
  );
 }

 update(id:any,pName:any,pDesc:any):void
 {
   this.product.product_name=pName;
   this.product.description=pDesc;
   this._productService.put(id,this.product)
   .subscribe(
     (response: any) => {
       console.log(response);

      this.myapp.showInfo('Category updated successfully','update');

       window.location.reload();
     },
     (error: any) => {
      for (const err in error.error.errors) {
        for (let i = 0; i < error.error.errors[err].length; i++){
          console.log(error.error.errors[err][i]);
          this.myapp.errormessage(error.error.errors[err][i]);
        }

      }
     }
   );
   //alert("Done");
 }

}

