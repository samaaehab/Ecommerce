import { SubCategory } from 'src/app/models/SubCategory';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { AuthenService } from './../../services/authen.service';

import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allsubcategories:any[]=[];
 public subcategories:any[]=[];
  // public logged=false;
  constructor(private _SubcategoryService:SubcategoryService,private _categoryService:CategoryServiceService) { }
  // constructor(
  //   public translate: TranslateService
  // ) {
  //   translate.addLangs(['en', 'ar']);
  //   translate.setDefaultLang('en');
  // }
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }
  

  ngOnInit(): void {
    //this.auth.status.subscribe(value=>this.logged=value);
      this._categoryService.get().subscribe(
        (res: any) => {
          for(const i in res.data){
            const id= res.data[i].id;
            this._SubcategoryService.getSubCatForEachCategory(id).subscribe(
              (res:any)=>{
                this.subcategories=res.data;

                console.log(this.subcategories);
                
                      this.allsubcategories.push(this.subcategories.map(m=>{return m}));

                    // for(let i=0;i<res.data.length;i++){
                    //   this.subcategories.push(res.data[i])
                    //   this.subcategories=this.subcategories.map(m=>{return m});

                    // }
                 },
              (err:any)=>{
                console.log(err);
                
              }
            )
          }
          console.log(this.allsubcategories);
          
          
        }
      );
        
      }
  }

