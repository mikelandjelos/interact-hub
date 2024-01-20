import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { switchMap } from 'rxjs';

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
    this.userService.getRecommendationFollowers(this.user.username).subscribe(
      (data: any) => {
        if (data.length > 0) {
          console.log(data);
          this.initialUsers = data;
        } else {
          this.userService.getInitialFollowers(this.user.username).subscribe(
            (initialData: any) => {
              this.initialUsers = initialData;
              console.log(this.initialUsers);
            },
            (error: any) => {
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }
  onFollowClick(user:any)
  {
    this.userService.followUser(this.user.username,user.username).subscribe((respo:any)=>{
     
        this.initialUsers= this.initialUsers.filter((el:any)=>el!=user)
      
    },
    (error:any)=>{
      if(error.status == 400)
      {
        this.dialog.open(NotificationPopupComponent, {
          data: {
            title: 'Notification',
            text: 'You already follow this person'
          }});
      }
    }
    
    )
  }
}

