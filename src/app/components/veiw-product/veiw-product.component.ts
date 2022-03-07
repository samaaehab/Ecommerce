import { HeaderComponent } from './../header/header.component';
import { Component, Input, OnInit,Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/Product';
import { Rating } from 'src/app/models/Rating';
import { User } from 'src/app/models/User';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { RatingService } from './../../services/rating.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-veiw-product',
  templateUrl: './veiw-product.component.html',
  styleUrls: ['./veiw-product.component.css']
})
export class VeiwProductComponent implements OnInit {
  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';

  x=0;
  prodid:any;
  users=new User();
  user = localStorage.getItem('email');
  ratings=new Rating();
  productCat:any[]=[];
  store:any[]=[];
  mainhomeRate=0;
  R:any;
  check: boolean = false;

  productDet:any;
  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService, private storeService: StoreService,
    private _ratingService: RatingService, private _userService: UserService,
    public myapp: AppComponent , public header:HeaderComponent) { }

  ngOnInit(): void {


    this._activatedRoute.paramMap.subscribe(params => {
      this.prodid = params.get('pId');
      this.show(this.prodid);


    });
    this._userService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.users = res.data.find((user: any) => user.email == this.user);
        this._ratingService.check(this.users.id,this.prodid).subscribe(
          (res:any)=>{
            console.log(this.users.id);
            console.log(this.prodid);

            this.mainhomeRate=res[0].degree;
          });
      });
      this.storeService.get().subscribe(
        (res:any)=>{
          for(let i in res.data){

            if(res.data[i].product_id==this.productDet.id)
              this.store.push(res.data[i]);
              console.log(this.store.length);

            if (this.store.length === 0) {
              // alert('no')
              this.check=true;
            } else {
              // alert('yes')
              this.check=false;
            }
          }
          },
          (error:any)=>{

        }
      );
    // this.getStore();

  }

  products:any[]=[];
  show(id:any){
    this._productService.show(id).subscribe(
      (res: any) => {
        this.productDet=res.data;
        let catId=this.productDet.category.id;
        this._productService.getProductsCategory(catId).subscribe(
          (res: any) => {
            this.productCat=res;
          },(error:any)=>{
            console.log(error);
          }
        );
      },(error:any)=>{
        console.log(error);
      }
    );
  }

addToCart(id:any,productSizeColor:any,qnt:any){
  this._productService.get().subscribe(
    (res:any)=>{
      for(let p in res.data){
        this.products.push(res.data[p]);

      }

      var product=this.products.find((p:any)=>p.id == id);
      if (localStorage.getItem('product' + productSizeColor) === null) {
        // this.header.cartCount();
      let price=product.price-product.discount;
      localStorage.setItem('product'+productSizeColor,product.id+"#$"+product.product_name+"#$"+product.image+"#$"+qnt+"#$"+price+"#$"+productSizeColor+"#$"+price*qnt);
        // this.header.count++;
      this.myapp.successmessage(product.product_name+" Added To Cart Successfuly");
    }
      else{
        this.myapp.showWarning(product.product_name+" Already Added Before","Oops");


      }

    }

  );


  }

  onmainHomeRateChange(rate:number,product_id:number):void{
    this.mainhomeRate=rate;
        this.ratings.product_id=product_id;
        this.ratings.degree=rate;
        this.ratings.user_id=this.users.id;
        this._ratingService.check(this.ratings.user_id,this.ratings.product_id).subscribe(
          (res:any)=>{

            this.R = res.length;
        // console.log(this.R);
            if(this.R>0){
              this.ratings.product_id=product_id;
              this.ratings.degree=rate;
              this.ratings.user_id=this.users.id;
              this._ratingService.put(res[0].id,this.ratings).subscribe(
                (res:any)=>{}
              );
              // console.log(res[0].id);
            }
            else{
          this._ratingService.post(this.ratings).subscribe(
            (res:any)=>{
            });
          }
          // this._ratingService.show();
          }
        );
    }
  // getStore(){
  //   this.storeService.get().subscribe(
  //        (res:any)=>{
  //  for(let i in res.data){

  //    if(res.data[i].product_id==this.productDet.id)
  //      this.store.push(res.data[i]);

  //  }
  //  },
  //      (error:any)=>{

  //      }
  //   );
  //     }



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

}
