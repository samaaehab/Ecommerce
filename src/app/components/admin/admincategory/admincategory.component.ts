import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
declare const $: any;
@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})
export class AdmincategoryComponent implements OnInit {
  categories:Category[]=[];
   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
  constructor(private _categoryService:CategoryServiceService ,public myapp: AppComponent ) { }

  ngOnInit(): void {
    this._categoryService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.categories = res.data;
      }
    );
  }

  //toaster
  

  
  add(cat_name:string):void{
    let category = new Category();
    category.cat_name=cat_name;
    this._categoryService.post(category).subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.message);
        this.categories.push(category);
        // var myAlert = document.getElementById('myAlert')
        // var bsAlert = new bootstrap.Alert(myAlert)
        this.myapp.successmessage();
      },
      (error: any) => {
        this.myapp.errormessage();
        // console.log(error);
        // console.log(error.error.errors);
        for (const err in error.error.errors) {
          // console.log(error.error.errors[err]);
          for (let i = 0; i < error.error.errors[err].length; i++){
            console.log(error.error.errors[err][i]);
            
          }
          
        }

        
      }
    );
  }

  delete(index:number):void
  {
    let category=this.categories[index];
    this._categoryService.delete(category.id)
    .subscribe(
      (response:any)=>{
        const cf=confirm('Are U Sure Delete ?');
        if(cf === true){
          this.categories.splice(index,1);
        }else{
          console.log('opps!');
          
        }
        
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
      (response:any)=>{
        window.location.reload();
      },
      (error:any)=>{}
    );
    //alert("Done");
  }


  
}
