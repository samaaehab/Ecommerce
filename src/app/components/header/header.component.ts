import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { SubCategory } from 'src/app/models/SubCategory';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { AuthenService } from './../../services/authen.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  static next(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
allsubcategories:any[]=[];
 public subcategories:any[]=[];
 count:any=0;
 categories:Category[]=[];
public logged=false;
constructor(private _SubcategoryService:SubcategoryService,
private _categoryService:CategoryServiceService,
private auth:AuthenService,private router:Router,private token:TokenService) { }
searchText:any;
productCount:any;
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
 
    this.auth.status.subscribe(value=>this.logged=value);
      this._categoryService.get().subscribe(
        (res: any) => {
        // console.log(res.data);
          for (const i in res.data) {
           
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
    this.cartCount();
    this.getCategoryData();
      }



      logout(event:MouseEvent){
        event.preventDefault();
        this.token.remove();
        this.auth.changeAuthStatus(false);
        this.router.navigateByUrl('/acount');
        localStorage.removeItem('email');

      }
      cartCount(){
        for(let i =0;i<localStorage.length;i++){
          let a = localStorage.key(i);
          if (a?.substring(0, 7) == 'product') {
            this.count++;
            // console.log(a?.substring(0, 7));

          }
        }

        return this.count;

      }
      getCategoryData(){ 
        this._categoryService.get().subscribe(
         (res: any) => {
           console.log(JSON.stringify(res));
            this.categories = res.data;
            console.log(this.categories);
            
         }
       );
      }
}


