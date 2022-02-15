import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-adminsubcategory',
  templateUrl: './adminsubcategory.component.html',
  styleUrls: ['./adminsubcategory.component.css']
})
export class AdminsubcategoryComponent implements OnInit {
  subcategories:SubCategory[]=[];
  categories:Category[]=[];

   // Pagination parameters.
   p: any = 1;
   count: any = 3;
   searchText:any;
   constructor(private _SubcategoryService:SubcategoryService,private _categoryService:CategoryServiceService) { }

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
  }

  add(sub_name:string,cat_id:any):void{
    let subcategory = new SubCategory();
    subcategory.subcat_name=sub_name;
    subcategory.cat_id=cat_id;
    
    this._SubcategoryService.post(subcategory).subscribe(
      (response:any)=>{
        this.subcategories.push(subcategory);
      },
      (error:any)=>{}
    );
  }

  delete(index:number):void
  {
    let subcategory=this.subcategories[index];
    this._SubcategoryService.delete(subcategory.id)
    .subscribe(
      (response:any)=>{
        const cf=confirm('Are U Sure Delete ?');
        if(cf === true){
          this.subcategories.splice(index,1);
        }else{
          console.log('opps!');
          
        }
        
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
        window.location.reload();
      },
      (error:any)=>{}
    );
    //alert("Done");
  }

}
