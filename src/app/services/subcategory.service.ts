import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SubCategory } from '../models/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  allSubCategories = new BehaviorSubject<SubCategory[]>([]);
  headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)

  constructor(private _httpClient: HttpClient) { }
  
  private url=`${environment.URLAPI}`;
  
  public get() { return this._httpClient.get(this.url + `subcategories`,{ 'headers': this.headers }); }
  public post(subcategory: SubCategory) {
  return this._httpClient.post(this.url + `subcategories`, subcategory,{ 'headers': this.headers })
}

delete(id:number){
  return this._httpClient.delete(this.url+`subcategories/${id}`,{ 'headers': this.headers });
}
put(id:number,subcategory:SubCategory){
  return this._httpClient.put(this.url+`subcategories/${id}`,subcategory,{ 'headers': this.headers });
}
public getSubCatForEachCategory(id:number){
  return this._httpClient.get(this.url + `${id}/subcategories`);
}
public show(id:number){
  return this._httpClient.get(this.url + `subcategories/${id}`);
}

}
