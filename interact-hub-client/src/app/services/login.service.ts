import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) {
   }



   
   signUp(user:any){
    console.log(environment.api)
    return this.httpClient.post(environment.api+"user",{user})
   }
}
