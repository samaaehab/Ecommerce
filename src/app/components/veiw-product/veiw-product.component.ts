import { CartService } from './../../services/cart.service';
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
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { NgxSpinnerService } from 'ngx-spinner';

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
  comments: any[] = [];

  productDet:any;

    // Pagination parameters.
    p: any = 1;
    count: any = 3;
  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService, private storeService: StoreService,
    private _ratingService: RatingService, private _userService: UserService,
    public myapp: AppComponent , public header:HeaderComponent ,private spinner: NgxSpinnerService ,private _commentService:CommentsService) { }


  ngOnInit(): void {
    window.scrollTo(0 , 0);
    this.spinner.show();

    this._activatedRoute.paramMap.subscribe(params => {
      this.prodid = params.get('pId');
      this.show(this.prodid);

      this.reviews(this.prodid);

    });
    this.getcomment(this.prodid);

    this._userService.show(this.user).subscribe(
      (res: any) => {
        this.users = res[0];
        this._ratingService.check(this.users.id,this.prodid).subscribe(
          (res:any)=>{
            this.mainhomeRate=res[0].degree;
          });
      },(error:any)=>{
      }
    );

      this.storeService.storesForeachProduct(this.prodid).subscribe(
        (res:any)=>{

              this.store=res;            
              this.spinner.hide();
            if (this.store.length === 0) {
              this.check=true;
            } else {
              this.check=false;
            }
          
          },
          (error:any)=>{

        }
      );
this.reviews(1);
  }
  products:any[]=[];
  reviewsForProduct:any;
  show(id:any){
    this._productService.show(id).subscribe(
      (res: any) => {
        this.productDet=res.data;
        let catId=this.productDet.category.id;
        this._productService.getProductsCategory(catId).subscribe(
          (res: any) => {
            this.productCat=res;
          },(error:any)=>{
          }
        );
      },(error:any)=>{
      }
    );
  }
reviews(id:any){
  this._ratingService.reviews(id).subscribe(
    (res:any)=>{
      this.reviewsForProduct=res[0].count;
    },
    (error)=>{
    }
  )
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
            if(this.R>0){
              this.ratings.product_id=product_id;
              this.ratings.degree=rate;
              this.ratings.user_id=this.users.id;
              this._ratingService.put(res[0].id,this.ratings).subscribe(
                (res:any)=>{this.reviews(this.prodid);}
              );
            }
            else{
          this._ratingService.post(this.ratings).subscribe(
            (res:any)=>{
              this.reviews(this.prodid);
            },(err:any)=>{

            }
            );
          }
          }
        );
    }

  addToFav(id:any,ProdName:any,Image:any,newPrice:any){
    if (localStorage.getItem('Fav' + id) === null) {
      localStorage.setItem('Fav' + id, ProdName + '#$' + Image + '#$' + newPrice + '#$' + id + '#$' + 1);
      this.myapp.successmessage(ProdName +" Added To Wish List Successfuly");
    } else {
      this.myapp.showWarning(ProdName +" Already Added Before","Oops");
    }
  }

  addcomment(productID: any, comment: any) {
    let newComment = new Comment();
    newComment.product_id = productID;
    newComment.comment = comment;
    newComment.user_id = this.users.id;


    this._commentService.post(newComment).subscribe(
      (res: any) => {

  this.getcomment(this.prodid)

      }, (err: any) => {

      }
    )

  }

  getcomment(id:any) {
    this._commentService.get(id).subscribe(
      (res: any) => {
        this.comments=res
      }, (err: any) => {
      }
    )
  }
}
