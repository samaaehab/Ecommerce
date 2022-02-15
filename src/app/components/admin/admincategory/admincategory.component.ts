import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
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
  constructor(private _categoryService:CategoryServiceService) { }

  ngOnInit(): void {
    this._categoryService.get().subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.categories = res.data;
      }
    );
  }
  add(cat_name:string):void{
    let category = new Category();
    category.cat_name=cat_name;
    this._categoryService.post(category).subscribe(
      (response:any)=>{
        this.categories.push(category);
      },
      (error:any)=>{}
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
