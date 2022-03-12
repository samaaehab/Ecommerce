import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from './../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  allProducts = new BehaviorSubject<Product[]>([]);
  headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)

  constructor(private _httpClient: HttpClient) { }

  private url=`${environment.URLAPI}`;

public get() { return this._httpClient.get(this.url + `products`,{ 'headers': this.headers }); }


public getForEachSubCategory(id:number){
  return this._httpClient.get(this.url + `subcategory/${id}/products`);
}
public getProductsCategory(id:number){
  return this._httpClient.get(this.url + `${id}/products`);
}
public show(id:number){
  return this._httpClient.get(this.url + `products/${id}`,{ 'headers': this.headers });
}
public getProductsForEachSubCategory(subcatId:any,catId:any){
  return this._httpClient.get(this.url + `${subcatId}/${catId}/products`);
}
public getProductWithBigDiscount(){
  return this._httpClient.get(this.url + `discounts`);
}

public post(product: any) {
  const headers=new HttpHeaders();
  return this._httpClient.post(this.url + `products`, product,{ 'headers': this.headers })
}
delete(id:number){
  return this._httpClient.delete(this.url+`products/${id}`,{ 'headers': this.headers });
}
put(id:number,product:Product){
  return this._httpClient.put(this.url+`products/${id}`,product,{ 'headers': this.headers });
}
}
