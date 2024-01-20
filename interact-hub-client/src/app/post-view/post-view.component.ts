import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.scss'
})
export class PostViewComponent {
    user:any;
   posts:any ;
  

  constructor(private postService:PostService, private dialog:MatDialog) {
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
    postService.getPosts(this.user.username).subscribe((respo)=>{this.posts=respo})
  }
  likePost(post:any)
  {
    console.log(post);
   this.postService.likePost(this.user.username,post.id).subscribe((respo)=>{
  
  },
  (error:any)=>{
    this.dialog.open(NotificationPopupComponent,{
      data: {
        title: 'Like',
        text: `You are liked post of ${post.username}`
      }
    })
  }
  )
  }
  ngOnInit(): void {
  
  
  }

  openDialog() {}

  onCommentPostClick() {
  
  }
  onGradePostClick(){
 
  }
  
  

  

  
 

}