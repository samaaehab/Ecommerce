import { Component, OnInit } from '@angular/core';
import { Product } from './../../../models/Product';
import { ProductService } from './../../../services/product.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
  products:Product[]=[];
  // Pagination parameters.
  p: any = 1;
  count: any = 3;
  searchText:any;
 constructor(private _productService:ProductService) { }

 ngOnInit(): void {
   this._productService.get().subscribe(
     (res: any) => {
       console.log(JSON.stringify(res));
       this.products = res.data;
     }
   );
 }
 add(product_name:string,description:string,image:any,image_path:string,subcat_id:number):void{
   let product = new Product();
   product.product_name=product_name;
   product.description=description;
   product.image=image;
   product.image_path=image_path;
   product.subcat_id=subcat_id;
   this._productService.post(product).subscribe(
     (response:any)=>{
       this.products.push(product);
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
         $("#image_path").prop('value',c?.image_path);
         $("#subcat_id").prop('value',c?.subcat_id);
       }
     }
   );

 }
 product =new Product();
 update(id:any,pName:any,pDesc:any,pImage:any,pImagePath:any,pSubcatId:any):void
 {
   this.product.product_name=pName;
   this.product.description=pDesc;
   this.product.image=pImage;
   this.product.image_path=pImagePath;
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

