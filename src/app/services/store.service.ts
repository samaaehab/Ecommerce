import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Store } from './../models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allstores = new BehaviorSubject<Store[]>([]);
  constructor(private _httpClient: HttpClient) { }

  private url=`${environment.URLAPI}`;

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
  show(id: any) {
    return this._httpClient.get(this.url+`stores/${id}`);
  }
}
