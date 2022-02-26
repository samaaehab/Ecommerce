import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
products:any[]=[];
imagepath: any = 'http://127.0.0.1:8000/public/image/';
p: any = 1;
count: any = 9;
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params=>{
        let subid=params.get('subid');
        let catid=params.get('catid');
        this._productService.getProductsForEachSubCategory(subid,catid).subscribe(
          (res:any)=>{
            this.products=res;
            console.log(this.products);
            
          }
        );
        
      })
    }

}
