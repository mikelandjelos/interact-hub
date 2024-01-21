import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user:any;
  createJobOffer:boolean=false;
constructor(private router:Router, private companyService:CompanyService){
  const userJson = localStorage.getItem('user') ?? '';
  this.user = JSON.parse(userJson);
  this.companyService.getCompanies(this.user.username).subscribe((respo:any)=>{
    console.log(respo)
    if(respo.length>0)
 {   this.createJobOffer=true}
  });
  
}
  navigateTo(path:string)
{
  if(path=='login')
  {
    localStorage.removeItem('user');
  }
  this.router.navigate([path]);
}
}
