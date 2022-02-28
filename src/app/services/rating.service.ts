import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _httpClient: HttpClient) { }
  private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `ratings`); }

// public post(store: Rate) {
//   return this._httpClient.post(this.url + `ratings`, store)
// }

// put(id:number,store:Store){
//   return this._httpClient.put(this.url+`ratings/${id}`,store);
// }
}
