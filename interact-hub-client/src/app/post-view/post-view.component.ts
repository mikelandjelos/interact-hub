import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';

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

  constructor(private postService:PostService) {
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
    postService.getPosts(this.user.username).subscribe((respo)=>{this.posts=respo})
  }

  ngOnInit(): void {
  
  
  }

  openDialog() {}

  onCommentPostClick() {
  
  }
  onGradePostClick(){
 
  }
  
  

  

  
 

}