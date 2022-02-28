import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rate } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _httpClient: HttpClient) { }
  private url=`http://127.0.0.1:8000/api/`;

public get() { return this._httpClient.get(this.url + `ratings`); }

public post(rate: Rate) {
  return this._httpClient.post(this.url + `ratings`, rate)
}

// put(id:number,store:Store){
//   return this._httpClient.put(this.url+`ratings/${id}`,store);
// }
}
