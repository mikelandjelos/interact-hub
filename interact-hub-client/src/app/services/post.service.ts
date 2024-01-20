import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient:HttpClient) { }
  getPosts(username:string){
    return this.httpClient.get(`${environment.api}post/recommendation/${username}`)
  }
  
}
