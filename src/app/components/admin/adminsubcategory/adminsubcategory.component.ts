import { AdmindashboardComponent } from './../admindashboard/admindashboard.component';
import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import  Swal from 'sweetalert2';
import { AdminTokenService } from 'src/app/services/admin-token.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-adminsubcategory',
  templateUrl: './adminsubcategory.component.html',
  styleUrls: ['./adminsubcategory.component.css']
})
export class AdminsubcategoryComponent implements OnInit {
  formSubcat= new FormGroup({});
  formUpdate= new FormGroup({});

  subcategories:SubCategory[]=[];
  categories:Category[]=[];

   // Pagination parameters.
   p: any = 1;
   count: any = 5;
  searchText: any;
  messagesCount:number=0;
  counter:number=0;
  ordersCount:number=0;
  order_count: any = 0;
  constructor(private _formBuilder: FormBuilder, private _SubcategoryService: SubcategoryService, private _categoryService: CategoryServiceService
    , public myapp: AppComponent ,private orderService: OrderService,
    private token: AdminTokenService, private auth: AuthenService,
    private router: Router) { }


  ngOnInit(): void {
    this.getOrderCount();
    this.formSubcat=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      CatId:['',[Validators.required]],
      });
    this.formUpdate=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
    });
      this.getSubCategoryData();
    this.getCategoryData();
  }
  getSubCategoryData(){
    this._SubcategoryService.get().subscribe(
      (res: any) => {
        this.subcategories = res.data;
      }
    );
   }
  getCategoryData(){
    this._categoryService.get().subscribe(
     (res: any) => {
       this.categories = res.data;
     }
   );
  }

isValidControl(name:string):boolean
{
return this.formSubcat.controls[name].valid;
}
isInValidAndTouched(name:string):boolean
{
return this.formSubcat.controls[name].invalid && (this.formSubcat.controls[name].dirty || this.formSubcat.controls[name].touched);
}
isControlHasError(name:string,error:string):boolean
{
return this.formSubcat.controls[name].invalid && this.formSubcat.controls[name].errors?.[error];
}

isValidControl2(name:string):boolean
{
return this.formUpdate.controls[name].valid;
}
isInValidAndTouched2(name:string):boolean
{
return this.formUpdate.controls[name].invalid && (this.formUpdate.controls[name].dirty || this.formUpdate.controls[name].touched);
}
isControlHasError2(name:string,error:string):boolean
{
return this.formUpdate.controls[name].invalid && this.formUpdate.controls[name].errors?.[error];
}


  add(sub_name:string,cat_id:any):void{
    let subcategory = new SubCategory();
    subcategory.subcat_name=sub_name;
    subcategory.cat_id=cat_id;

    this._SubcategoryService.post(subcategory).subscribe(
      (response: any) => {
        this.getCategoryData();
        this.getSubCategoryData();
        this.myapp.successmessage(response.message);

      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            this.myapp.errormessage(error.error.errors[err][i]);
          }

        }
      }
    );
  }

  delete(index:number):void
  {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it',
        }).then((result) => {
          if (result.isConfirmed) {
            let subcategory=this.subcategories[index];
            this._SubcategoryService.delete(index)
            .subscribe(
              (response: any) => {
            this.subcategories.splice(index, 1);
            this.getSubCategoryData();
            this.getCategoryData();
            this.myapp.successmessage(response.message);
          })
          } else if (result.isDismissed) {
            this.myapp.errormessage("Item not Deleted");
          }
      });
  }

  edit(id:number){

    this.subcategories.forEach(
      c=>{
        if(c.id == id){
          $("#upcid").prop('value',c?.id);
          $("#upcategory").prop('value',c?.subcat_name);
        }
      }
    );

  }
  subcategory =new SubCategory();
  update(id:any,cName:string):void
  {
    this.subcategory.subcat_name=cName;
    this._SubcategoryService.put(id,this.subcategory)
    .subscribe(
      (response:any)=>{
        this.getCategoryData();
        this.getSubCategoryData();
        this.myapp.showInfo(' SubCategory updated successfly', 'update');

      },
      (error: any) => {
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            this.myapp.errormessage(error.error.errors[err][i]);
          }

        }
      }
    );
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
