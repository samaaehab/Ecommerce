import { Order } from './../models/Order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  allOrders = new BehaviorSubject<Order[]>([]);
  constructor(private _httpClient: HttpClient) { }
  private url=`${environment.URLAPI}`;

  public get() { return this._httpClient.get(this.url + `orders`); }
  
  public post(order: Order) {
    return this._httpClient.post(this.url + `orders`, order)
  }

  delete(id:number){
    return this._httpClient.delete(this.url+`orders/${id}`);
  }

  put(id:number,order:Order){
    return this._httpClient.put(this.url+`orders/${id}`, order);
  }

}