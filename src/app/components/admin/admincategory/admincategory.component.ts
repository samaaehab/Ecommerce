import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Massege } from 'src/app/models/Massege';
declare const $: any;
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})
export class AdmincategoryComponent implements OnInit {
  formCat= new FormGroup({});
  categories:Category[]=[];
  massege=new Massege;
   // Pagination parameters.

   p: any = 1;
   count: any = 3;
   searchText:any;

  constructor(private _formBuilder: FormBuilder, private _categoryService: CategoryServiceService,
    public myapp: AppComponent) { }

  ngOnInit(): void {
    this.formCat=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],      
      });
      this.getCategoryData();
  }
  getCategoryData(){ 
    this._categoryService.get().subscribe(
     (res: any) => {
       console.log(JSON.stringify(res));
       this.categories = res.data;
     }
   );
  }

isValidControl(name:string):boolean
{
return this.formCat.controls[name].valid;
}
isInValidAndTouched(name:string):boolean
{
return this.formCat.controls[name].invalid && (this.formCat.controls[name].dirty || this.formCat.controls[name].touched);
}
isControlHasError(name:string,error:string):boolean
{
return this.formCat.controls[name].invalid && this.formCat.controls[name].errors?.[error];
}

  add(cat_name:string){
    let category = new Category();
    category.cat_name=cat_name;
    this._categoryService.post(category).subscribe(
      (response: any) => {
        // console.log(response);
        // console.log(response.message);
        // this.categories.push(category);
        this.getCategoryData();
 
        // var myAlert = document.getElementById('myAlert')
        // var bsAlert = new bootstrap.Alert(myAlert)
        //this.myapp.successmessage();

        this.myapp.successmessage(response.message);
        
      },
      (error: any) => {
       
        // console.log(error);
        // console.log(error.error.errors);
        for (const err in error.error.errors) {
          for (let i = 0; i < error.error.errors[err].length; i++){
            console.log(error.error.errors[err][i]);
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
            this._categoryService.delete(index)
              .subscribe(
             (response: any) => {  
            this.categories.splice(index, 1);
            this.getCategoryData();
            this.myapp.successmessage(response.message);
          })
          } else if (result.isDismissed) {
            this.myapp.errormessage("Item not Deleted"); 
          }
      });
    

  }
  edit(id:number){
    this.categories.forEach(
      c=>{
        if(c.id == id){
          $("#upcid").prop('value',c?.id);
          $("#upcategory").prop('value',c?.cat_name);
        }
      }
    );
    
  }
  category =new Category();
  update(id:any,cName:any):void
  {
    this.category.cat_name=cName;
    this._categoryService.put(id,this.category)
    .subscribe(
      (response: any) => {
        this.getCategoryData();
        this.myapp.showInfo('Category updated successfully','update');
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
