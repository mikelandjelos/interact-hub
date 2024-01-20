import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule,NotificationPopupComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  initialUsers:any;
  user:any;
  constructor(private userService:UserService,private dialog:MatDialog){
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
   this.userService.getInitialFollowers(this.user.username).subscribe((respo)=>{
    this.initialUsers=respo;
   })
  }
  onFollowClick(user:any)
  {
    this.userService.followUser(this.user.username,user.username).subscribe((respo:any)=>{
      if(respo.status!=200)
      {
        this.dialog.open(NotificationPopupComponent,{})
      }
    })
  }

}
