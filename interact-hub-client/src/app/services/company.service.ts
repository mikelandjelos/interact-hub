import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient:HttpClient) { }
  createCompany(company:any, username:string){
    return this.httpClient.post(`${environment.api}company/${username}`,company);
  }
  getCompanies(username:string)
  {
    return this.httpClient.get(`${environment.api}company/${username}`);
  }
  createJobOfferForCompany(companyName:string,job:any)
  {
    return this.httpClient.post(`${environment.api}job/${companyName}`,job);
  }
  getRecommendedJobOffers(username:string){
    return this.httpClient.get(`${environment.api}job/recommendation/${username}`);
  }
  applyForJob(username:string,jobId:string){
    return this.httpClient.post(`${environment.api}job/apply/${username}/${jobId}`,{});
  }
}
