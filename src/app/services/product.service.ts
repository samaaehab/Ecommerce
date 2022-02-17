import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  allProducts = new BehaviorSubject<Product[]>([]);
  constructor(private _httpClient: HttpClient) { }

private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `products`); }

public getForEachCategory(id:number){
  return this._httpClient.get(this.url + `category/${id}/products`);
}

public post(product: Product) {
  const headers=new HttpHeaders();
  return this._httpClient.post(this.url + `products`, product,{headers:headers})
}
delete(id:number){
  return this._httpClient.delete(this.url+`products/${id}`);
}
put(id:number,product:Product){
  return this._httpClient.put(this.url+`products/${id}`,product);
}
}
