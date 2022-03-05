import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { OrderDetails } from '../models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private url=`${environment.URLAPI}`;
  constructor(private _httpClient: HttpClient) { }
  public get() { return this._httpClient.get(this.url + `order_details`); }
  public post(order_details:OrderDetails) {
    return this._httpClient.post(this.url + `order_details`, order_details)
  }
  public view(id:any){
    return this._httpClient.get(this.url + `view/order_details/${id}`);
  }
}
