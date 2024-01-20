import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  public loginForm:FormGroup;
  
constructor(private router:Router, private route:ActivatedRoute,private formBuilder:FormBuilder, private loginService:LoginService,     private dialog: MatDialog  ){
  this.loginForm = this.formBuilder.group({name:'',surname:'',profession:'',username:'',password:''});
}
ngOnInit(): void {
  
}
isLoginRoute():boolean {
   const b:boolean =this.router.url.endsWith('/login');
   
   return b
}
navigateTo(route: string): void {
  this.router.navigate([`/${route}`]);
}
onSubmit() {
  if(this.isLoginRoute())
  {
  const username = this.loginForm.value.username;
  const password = this.loginForm.value.password;
  
  const body = {username:username,password:password};
  this.loginService.login(body).subscribe((respo:any)=>{
    if(respo.status==200)
    {
      console.log(respo.message);
      const userJson = JSON.stringify(respo.message);

     localStorage.setItem('user',userJson);
      this.navigateTo('');
    }
  },
  (error: any) => {
    
    if (error.status === 400) {
      this.dialog.open(NotificationPopupComponent, {
        data: {
          title: 'Notification',
          text: 'Username or password are incorrect'
        }
      });
    } else {
     
      console.error('Unexpected error:', error);
    }
  });
  }
  else
  {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const name = this.loginForm.value.name;
    const surname = this.loginForm.value.surname;
    const profession = this.loginForm.value.profession;
    const user = {
      username:username,
      password:password,
      name:name,
      surname:surname,
      profession:profession
    }
  
    this.loginService.signUp(user).subscribe((respo)=>console.log(respo));
  }
}
}
