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
   getInitialFollowers(username:string)
  {
    return this.httpClient.get(`${environment.api}user/recommendation/initial/${username}`)
  }
  followUser(username1:string, username2:string)
  {
    return this.httpClient.post(`${environment.api}user/follow/${username1}/${username2}`,{})
  }
  getFollowsCount()
  {

  }
  getRecommendationFollowers(username:string)
  {
    return this.httpClient.get(`${environment.api}user/recommendation/followOfFollows/${username}`)

  }
}
