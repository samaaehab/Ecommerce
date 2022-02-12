import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from './../models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  allCategories = new BehaviorSubject<Category[]>([]);
  constructor(private _httpClient:HttpClient) { }

private url=`http://127.0.0.1:8000/api/`;

public get() {​​​​​​ return this._httpClient.get(this.url+`categories`); }​​​​​​

delete(id:number){
  return this._httpClient.delete(this.url+`categories/${id}`);
}

}

