import { Component } from '@angular/core';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-joboffer',
  standalone: true,
  imports: [HeaderComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './joboffer.component.html',
  styleUrl: './joboffer.component.scss'
})
export class JobofferComponent {
  public jobOffer:FormGroup;
  public companies:any;
  public companyNames:any
  user:any;
  constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder, private companyService:CompanyService, private dialog:MatDialog){
    this.jobOffer = this.formBuilder.group({name:'Select Company',position:'',description:''});
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
    this.companyService.getCompanies(this.user.username).subscribe((respo:any)=>{
      console.log(respo)
      this.companies=respo;
    });
  }
  ngOnInit(): void {
    
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
  onSubmit() {
    const name = this.jobOffer.value.name;
    const position = this.jobOffer.value.position;
    const description = this.jobOffer.value.description;
    const job ={
      position:position,
      description:description
    }
    this.companyService.createJobOfferForCompany(name,job).subscribe((respo)=>{
      this.dialog.open(NotificationPopupComponent,{
        data:{
          title:"Notification",
          text:"Successful created offer"
        }
      })
    });
  }
  }