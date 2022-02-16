import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Product } from './../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
  products:Product[]=[];
  subcategories:SubCategory[]=[];
  // Pagination parameters.
  p: any = 1;
  count: any = 3;
  searchText:any;
 constructor(private _productService:ProductService,private _SubcategoryService:SubcategoryService) { }

 ngOnInit(): void {
   this._productService.get().subscribe(
     (res: any) => {
       console.log(JSON.stringify(res));
       this.products = res.data;
     }
   );
   this._SubcategoryService.get().subscribe(
    (res: any) => {
      console.log(JSON.stringify(res));
      this.subcategories = res.data;
    }
  );

 }
 add(product_name:string,description:string,subcat_id:any):void{
   let product = new Product();

   product.product_name=product_name;
  //  product.image=image;
   product.description=description;
   product.subcat_id=subcat_id;
   this._productService.post(product).subscribe(
     (response:any)=>{
       this.products.push(product);
       alert('ok');
     },
     (error:any)=>{}
   );

 }

 delete(index:number):void
 {
   let product=this.products[index];
   this._productService.delete(product.id)
   .subscribe(
     (response:any)=>{
       const cf=confirm('Are U Sure Delete ?');
       if(cf === true){
         this.products.splice(index,1);
       }else{
         console.log('opps!');

       }

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
         $("#image").prop('value',c?.image);
         $("#subcat_id").prop('value',c?.subcat_id);
       }
     }
   );

 }
 product =new Product();
 update(id:any,pName:any,pDesc:any,pImage:any,pSubcatId:any):void
 {
   this.product.product_name=pName;
   this.product.description=pDesc;
   this.product.image=pImage;
   this.product.subcat_id=pSubcatId;
   this._productService.put(id,this.product)
   .subscribe(
     (response:any)=>{
       window.location.reload();
     },
     (error:any)=>{}
   );
   //alert("Done");
 }

}

