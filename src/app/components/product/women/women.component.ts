import { StoreService } from './../../../services/store.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {
  public allsubcategories:any[]=[];
  public subcategories:any[]=[];
  productsCategory:any[]=[];
  imagepath: any = 'http://127.0.0.1:8000/public/image/';
  price: any[] = [];
  p: any = 1;
  count: any = 9;
  searchText: any;
  cart:any[]=[];
  user=localStorage.getItem('email');
  storeId:any[]=[];
  productStore:any[]=[];
  productColor:any[]=[];
  productSize:any[]=[];
  productStoreId:any[]=[];
  allStore:any[]=[];
  total:number=0;
  constructor(private productService: ProductService, private storeService: StoreService, public header: HeaderComponent,
    private _SubcategoryService: SubcategoryService, private _categoryService: CategoryServiceService, private _userService: UserService
  ,public myapp:AppComponent) { }


  ngOnInit(): void {

    this.getPrice();
    this._categoryService.get().subscribe(
      (res: any) => {
        let x= res.data.find((cat:any)=>cat.cat_name=='woman');
        console.log(x.id);

        this.productService.getProductsCategory(x.id).subscribe(
          (res: any) => {
            this.productsCategory.push(res);
            this.productsCategory=this.productsCategory[0];
            console.log(this.productsCategory);
            // console.log(res);
    
    
          }
        );
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
    this.storeService.get().subscribe(
      (res:any)=>{
    for(let i in res.data){
  
    this.productStore.push(res.data[i]);
  
  
  }
   console.log(this.productStore);    
  },
    (error:any)=>{
  
    }
  );
    this.getIdByEmail();
    this.getStoreId();
    this.closeModel();

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
  products:any[]=[];
  addToCart(id:any,productSizeColor:any){
    this.productService.get().subscribe(
      (res:any)=>{
        for(let p in res.data){
          this.products.push(res.data[p]);
         
        } 
        
        let product=this.products.find((p:any)=>p.id == id);
        let price=product.price-product.discount;
        localStorage.setItem('product'+productSizeColor,product.id+"#$"+product.product_name+"#$"+this.imagepath+product.image+"#$"+1+"#$"+price+"#$"+productSizeColor+"#$"+price);
        alert('yessssssssss');
    
      } 
    
    );
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
  getid(id:number){
    this.productsCategory.forEach(
      c=>{
        if(c.id == id){
          var img=this.imagepath+c.image;
           this.total=c.price - c.discount;
          $("#exampleModalLabel1").html(c?.product_name);
          $("#exampleModalLabel11").prop('value',c?.id);
          $("#exampleModalLabel2").html(c?.description);
          $("#exampleModalLabel4").html(String(this.total));

          $("#exampleModalLabel3").prop('src',img);
          // $("#exampleModalLabel3").prop('src')=c?.src;
          // console.log(this.imagepath+c.image);

          for(let i=0;i<this.productStore.length;i++){
           if(id==this.productStore[i].product_id){
            this.productStoreId.push(this.productStore[i].id);
            this.productSize.push(this.productStore[i].size);
            this.productColor.push(this.productStore[i].color);
            this.allStore.push(this.productStore[i]);

           }
        
          }

          console.log(this.productSize);
          console.log(this.productColor);
          console.log( this.allStore);



        }
      }
    );
  

  }
   closeModel(){
  
    this.productSize=[];
    this.productColor=[];
    this.productStoreId=[];
    this.allStore=[];
  }
}
