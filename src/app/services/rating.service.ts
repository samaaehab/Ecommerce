import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  allRating = new BehaviorSubject<Rating[]>([]);
  constructor(private _httpClient: HttpClient) { }
  private url=`${environment.URLAPI}`;

public get() { return this._httpClient.get(this.url + `ratings`); }

public post(rate: Rating) {
  return this._httpClient.post(this.url + `ratings`, rate)
}
public check(user_id:any,product_id:any){
  return this._httpClient.get(this.url+`${user_id}/${product_id}/ratings`)
}
show(id:number){
  return this._httpClient.get(this.url+`ratings/${id}`);
}

put(id:number,rate:Rating){
  return this._httpClient.put(this.url+`ratings/${id}`,rate);
}
}
