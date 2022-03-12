import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  headers= new HttpHeaders().set('Authorization', `${environment.APIKEY}`)
  constructor(private _httpClient: HttpClient) { }
  private url = `${environment.URLAPI}`;
  
  public get(id:any) { return this._httpClient.get(this.url + `comments/${id}`,{ 'headers': this.headers }); }


public post(comment:Comment) {
  return this._httpClient.post(this.url + `comments`, comment,{ 'headers': this.headers })
}
}
