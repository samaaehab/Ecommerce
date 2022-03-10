import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _httpClient: HttpClient) { }
  private url = `${environment.URLAPI}`;
  
  public get(id:any) { return this._httpClient.get(this.url + `comments/${id}`); }


public post(comment:Comment) {
  return this._httpClient.post(this.url + `comments`, comment)
}
}
