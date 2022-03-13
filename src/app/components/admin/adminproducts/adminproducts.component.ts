import { CategoryServiceService } from 'src/app/services/category-service.service';
import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Product } from './../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { Store } from './../../../models/Store';
import { StoreService } from './../../../services/store.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/Category';
import { event } from 'jquery';
import { Router } from '@angular/router';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
  products: any[] = [];
  subcategories: SubCategory[] = [];
  categories: Category[] = [];
  stores: Store[] = [];

  files: any;

  imagepath: any = 'https://res.cloudinary.com/ecommerceangular22/image/upload/v1646609059/';
  // Pagination parameters.
  p: any = 1;
  count: any = 5;
  searchText: any;
  id: any;
  product = new Product();
  store = new Store();
  formProduct = new FormGroup({});
  messagesCount:number=0;
  counter:number=0;
  ordersCount:number=0;
  order_count: any = 0;
  constructor(private _productService: ProductService, private _SubcategoryService: SubcategoryService, private _StoreService: StoreService, private _categoryService: CategoryServiceService,
    public myapp: AppComponent, private http: HttpClient, private _formBuilder: FormBuilder ,private orderService: OrderService ,
    private token: AdminTokenService, private auth: AuthenService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderCount();
    this.formProduct = this._formBuilder.group({
      ProductName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ProductDescription: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      SubCategory: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Picture: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],

    });
    this.getProductData();
    this.getCategoryData();
    this.getSubCategoryData();
    this.getStoreData();
  }
  getProductData() {
    this._productService.get().subscribe(
      (res: any) => {
        this.products = res.data;

      }
    );
  }
  getSubCategoryData() {
    this._SubcategoryService.get().subscribe(
      (res: any) => {
        this.subcategories = res.data;
      }
    );
  }
  getCategoryData() {
    this._categoryService.get().subscribe(
      (res: any) => {
        this.categories = res.data;
      }
    );
  }

  getStoreData() {
    this._StoreService.get().subscribe(
      (res: any) => {
        this.stores = res.data;
      }
    );
  }

  imageUpload(event: any) {
    this.files = event.target.files[0];

  }

  add(product_name: string, image: any, description: string, price: any, discount: any, subcat_id: any, cat_id: any): void {
    let formdata = new FormData();
    formdata.append('product_name', product_name);
    formdata.append('description', description);
    formdata.append('price', price);
    formdata.append('discount', discount);
    formdata.append('subcat_id', subcat_id);
    formdata.append('image', this.files, this.files.name);
    formdata.append('cat_id', cat_id);

    this._productService.post(formdata).subscribe(
      (response: any) => {
        this.getCategoryData();
        this.getSubCategoryData();
        this.getProductData();
        this.myapp.successmessage(response.message);
      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++) {
            this.myapp.errormessage(error.error.errors[err][i]);
          }

        }
      }
    );
  }

  deleteFeature(index: number): void {
    let store = this.stores[index];
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        this._StoreService.delete(index)
          .subscribe(
            (response: any) => {
              this.products.splice(index, 1);
              this.getStoreData();
              this.myapp.successmessage(response.message);
            })

      } else if (result.isDismissed) {
        this.myapp.errormessage("Store not Deleted");
      }
    });
  }
  delete(index: number): void {
    let product = this.products[index];
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {

      if (result.isConfirmed) {
        this._productService.delete(index)
          .subscribe(
            (response: any) => {
              this.products.splice(index, 1);
              this.getCategoryData();
              this.getSubCategoryData();
              this.getProductData();
              this.myapp.successmessage(response.message);
            })
      } else if (result.isDismissed) {
        this.myapp.errormessage("product not Deleted");


      }
    });
  }
  edit(id: number) {

    this.products.forEach(
      c => {
        if (c.id == id) {
          $("#uppid").prop('value', c?.id);
          $("#productName").prop('value', c?.product_name);
          $("#description").prop('value', c?.description);
          $("#ProdPrice").prop('value', c?.price);
          $("#ProdDiscount").prop('value', c?.discount);
        }
      }
    );

  }

  getId(id: number) {
    this.products.forEach(
      c => {
        if (c.id == id) {
          $("#productId").prop('value', c?.id);
        }
      }
    );
  }

  addFeature(id: any, color: string, size: string) {
    this.store.product_id = id;
    this.store.color = color;
    this.store.size = size;
    this._StoreService.post(this.store).subscribe(
      (res: any) => {
        this.getStoreData();
        this.myapp.successmessage(res.message);
      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++) {
            this.myapp.errormessage(error.error.errors[err][i]);
          }

        }
      }
    );
  }

  update(id: any, pName: any, pDesc: any, price: any, discount: any): void {
    this.product.product_name = pName;
    this.product.description = pDesc;
    this.product.price = price;
    this.product.discount = discount;
    this._productService.put(id, this.product)
      .subscribe(
        (response: any) => {
          this.getCategoryData();
          this.getSubCategoryData();
          this.getProductData();
          this.myapp.showInfo('product updated successfully', 'update');
        },
        (error: any) => {
          for (const err in error.error.errors) {
            for (let i = 0; i < error.error.errors[err].length; i++) {
              this.myapp.errormessage(error.error.errors[err][i]);
            }

          }
        }
      );
  }


  isValidControl(name: string): boolean {
    return this.formProduct.controls[name].valid;
  }
  isInValidAndTouched(name: string): boolean {
    return this.formProduct.controls[name].invalid && (this.formProduct.controls[name].dirty || this.formProduct.controls[name].touched);
  }
  isControlHasError(name: string, error: string): boolean {
    return this.formProduct.controls[name].invalid && this.formProduct.controls[name].errors?.[error];
  }
  logout(event:MouseEvent){
    event.preventDefault();
    this.token.remove();
    this.auth.changeAdminAuthStatus(false);
    this.router.navigateByUrl('/admin-acount');
  }
  getOrderCount(){
    this.orderService.get().subscribe(
      (res:any)=>{
        this.ordersCount=res.data.length;
        for(let i = 0 ; i < this.ordersCount ; i++){
          if(res.data[i].status === 'pending'){
            this.order_count++;
          }

        }
      }
    )
  }

}
