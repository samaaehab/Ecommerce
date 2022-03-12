import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Store } from './../models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  allstores = new BehaviorSubject<Store[]>([]);
  headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)

  constructor(private _httpClient: HttpClient) { }

  private url=`${environment.URLAPI}`;

public get() { return this._httpClient.get(this.url + `stores`,{ 'headers': this.headers }); }

public post(store: Store) {
  return this._httpClient.post(this.url + `stores`, store,{ 'headers': this.headers })
}
delete(id:number){
  return this._httpClient.delete(this.url+`stores/${id}`,{ 'headers': this.headers });
}
put(id:number,store:Store){
  return this._httpClient.put(this.url+`stores/${id}`,store,{ 'headers': this.headers });
}
  show(id: any) {
    return this._httpClient.get(this.url+`stores/${id}`);
  }
}
