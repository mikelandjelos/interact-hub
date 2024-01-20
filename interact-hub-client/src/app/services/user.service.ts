import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) {


    
   }
   createPost(post:any,username:string)
   {
    return this.httpClient.post(`${environment.api}post/${username}`,post);
   }
}
