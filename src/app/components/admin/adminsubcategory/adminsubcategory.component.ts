import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-adminsubcategory',
  templateUrl: './adminsubcategory.component.html',
  styleUrls: ['./adminsubcategory.component.css']
})
export class AdminsubcategoryComponent implements OnInit {
  formSubcat= new FormGroup({});
  subcategories:SubCategory[]=[];
  categories:Category[]=[];

   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
  constructor(private _formBuilder: FormBuilder, private _SubcategoryService: SubcategoryService, private _categoryService: CategoryServiceService
    ,public myapp: AppComponent) { }

  ngOnInit(): void {
    this._SubcategoryService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.subcategories = res.data;
      }
    );

    this._categoryService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res.data));
        this.categories = res.data;
      }
    );

    this.formSubcat=this._formBuilder.group({
      Name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]], 
      CatId:['',[Validators.required]],           
      });
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


  add(sub_name:string,cat_id:any):void{
    let subcategory = new SubCategory();
    subcategory.subcat_name=sub_name;
    subcategory.cat_id=cat_id;
    
    this._SubcategoryService.post(subcategory).subscribe(
      (response: any) => {
        // this.myapp.successmessage(response.message);
        this.subcategories.push(subcategory);
        console.log(response.message);
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

  delete(index:number):void
  {
    let subcategory=this.subcategories[index];
    this._SubcategoryService.delete(subcategory.id)
    .subscribe(
      (response: any) => { 
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
            this.subcategories.splice(index, 1);
            // window.location.reload();
            this.myapp.successmessage(response.message);

          } else if (result.isDismissed) {
            // console.log('Clicked No, File is safe!');
            this.myapp.errormessage("Item not Deleted");

            
          }
        })
         
      
        // this.myapp.delete();
        
      },
      (error:any)=>{}
    );    

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
        this.myapp.showInfo(' SubCategory updated successfly','update');
        window.location.reload();
        // this.myapp.showInfo(' item updated successfly','update');
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
