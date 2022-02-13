import { Order } from './../models/Order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  allOrders = new BehaviorSubject<Order[]>([]);
  constructor(private _httpClient: HttpClient) { }
  private url = `http://127.0.0.1:8000/api/`;


  public get() { return this._httpClient.get(this.url + `orders`); }
  public post(order: Order) {
    return this._httpClient.post(this.url + `orders`, order)
  }
  delete(id:number){
    return this._httpClient.delete(this.url+`orders/${id}`);
  }
}