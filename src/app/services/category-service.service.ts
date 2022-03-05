import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from './../models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  allCategories = new BehaviorSubject<Category[]>([]);
  constructor(private _httpClient: HttpClient) { }

  private url=`${environment.URLAPI}`;

public get() { return this._httpClient.get(this.url + `categories`); }
  
public post(category: Category) {
  return this._httpClient.post(this.url + `categories`, category)
}
delete(id:number){
  return this._httpClient.delete(this.url+`categories/${id}`);
}
put(id:number,category:Category){
  return this._httpClient.put(this.url+`categories/${id}`,category);
}


}

