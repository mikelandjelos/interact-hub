import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  public registerCompany:FormGroup;
  user:any;
  constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder, private companyService:CompanyService, private dialog:MatDialog){
    this.registerCompany = this.formBuilder.group({name:'',email:'',phone:''});
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
  }
  ngOnInit(): void {
    
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
  onSubmit() {
    const name = this.registerCompany.value.name;
    const email = this.registerCompany.value.email;
    const phone = this.registerCompany.value.phone;
    const company = {
      name:name,
      email:email,
      phone:phone
    }
   this.companyService.createCompany(company,this.user.username).subscribe((respo)=>{
    console.log(respo)
    this.navigateTo('');
   
   },
   (error:any)=>{
      this.dialog.open(NotificationPopupComponent,{
        data:{
          title:"Notification",
          text:"This company has already been registred"
        }
      })
   }
   
   );
  }
  }