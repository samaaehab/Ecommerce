import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { NgxPaginationModule } from 'ngx-pagination';

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
  constructor(private categoryService:CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryService.get().subscribe(
        (res:any)=>{this.categories=res.data;
          console.log(JSON.stringify(res));

        }

    )
  }

}
