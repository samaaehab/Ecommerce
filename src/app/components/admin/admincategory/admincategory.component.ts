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
    this._categoryService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.categories = res.data;
      }
    );
    this.formCat=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],      
      });
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
        console.log(response);
        console.log(response.message);
        this.categories.push(category);
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
    let category=this.categories[index];
    this._categoryService.delete(index)
    .subscribe(
      (response: any) => {
        console.log(category);
        
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
            this.categories.splice(index, 1);
            // window.location.reload();
            this.myapp.successmessage(response.message);

          } else if (result.isDismissed) {
            // console.log('Clicked No, File is safe!');
            this.myapp.errormessage("Item not Deleted");

            
          }
        })
  
      },
      (error:any)=>{}
    );
    

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
        this.myapp.showInfo('Category updated successfly','update');
        window.location.reload();
        // this.myapp.showInfo(' item updated','success');

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
