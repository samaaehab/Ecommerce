import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubCategory } from '../models/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  allSubCategories = new BehaviorSubject<SubCategory[]>([]);
  constructor(private _httpClient: HttpClient) { }
  
  private url=`http://127.0.0.1:8000/api/`;
  
  public get() { return this._httpClient.get(this.url + `subcategories`); }
  public post(subcategory: SubCategory) {
  return this._httpClient.post(this.url + `subcategories`, subcategory)
}

delete(id:number){
  return this._httpClient.delete(this.url+`subcategories/${id}`);
}
put(id:number,subcategory:SubCategory){
  return this._httpClient.put(this.url+`subcategories/${id}`,subcategory);
}
public getSubCatForEachCategory(id:number){
  return this._httpClient.get(this.url + `${id}/subcategories`);
}

}
