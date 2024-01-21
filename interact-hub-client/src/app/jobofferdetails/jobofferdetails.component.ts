import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-jobofferdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobofferdetails.component.html',
  styleUrl: './jobofferdetails.component.scss'
})
export class JobofferdetailsComponent {
  user:any;
  posts:any ;
 

 constructor( private dialog:MatDialog, private companyService:CompanyService) {
  const userJSON = localStorage.getItem('user')??'';
  this.user = JSON.parse(userJSON);
  this.companyService.getRecommendedJobOffers(this.user.username).subscribe((respo)=>{console.log(respo)
  this.posts = respo;
  });
   
 }
apply(post:any){
  console.log(post);
  this.companyService.applyForJob(this.user.username,post.id).subscribe((respo)=>{console.log(respo)
  
  this.posts=this.posts.filter((el:any)=>el!=post)
  
  })
}
 ngOnInit(): void {
 
 
 }

 openDialog() {}

 onCommentPostClick() {
 
 }
 onGradePostClick(){

 }
 
 

 

 


}