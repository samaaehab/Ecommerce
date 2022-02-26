import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private url=`http://127.0.0.1:8000/api/`;
  constructor(private _httpClient: HttpClient) { }
  public post(order_details:OrderDetails) {
    return this._httpClient.post(this.url + `order_details`, order_details)
  }
}
