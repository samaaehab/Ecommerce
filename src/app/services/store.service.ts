import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from './../models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allstores = new BehaviorSubject<Store[]>([]);
  constructor(private _httpClient: HttpClient) { }

private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `stores`); }

public post(store: Store) {
  return this._httpClient.post(this.url + `stores`, store)
}
delete(id:number){
  return this._httpClient.delete(this.url+`stores/${id}`);
}
put(id:number,store:Store){
  return this._httpClient.put(this.url+`stores/${id}`,store);
}
}
