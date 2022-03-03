import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from './../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient: HttpClient) { }

private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `carts`); }
public getCartsForEachUser(id:any) { return this._httpClient.get(this.url + `cart/${id}`); }

public post(cart:Cart) {
  return this._httpClient.post(this.url + `carts`, cart)
}
delete(id:number){
  return this._httpClient.delete(this.url+`carts/${id}`);
}
put(id:number,cart:Cart){
  return this._httpClient.put(this.url+`carts/${id}`,cart);
}

cartCount(){
  let count = 0;
  for(let i =0;i<localStorage.length;i++){
    let a = localStorage.key(i);
    if (a?.substring(0, 7) == 'product') {
      count++;
      // console.log(a?.substring(0, 7));

    }
  }
  return count;
}
totalPrice(){
  let productsInCart:any[]= [];
  let totalPrice =0;
  for (var i = 0; i < localStorage.length; i++) {
    let a = localStorage.key(i);
    if (a?.substring(0, 7) == 'product') {
      let products = localStorage.getItem(a);

      let splitProduct = products?.split('#$');
      productsInCart.push(splitProduct);
      // console.log(this.productsInCart);
      // this.cartCount=this.productsInCart.length;



    }
  }

  for (var i = 0; i < productsInCart.length; i++) {

    totalPrice+=Number(productsInCart[i][6]);

   }
   return totalPrice;
}

omg(key:any) {

  localStorage.removeItem(key);

}
}

