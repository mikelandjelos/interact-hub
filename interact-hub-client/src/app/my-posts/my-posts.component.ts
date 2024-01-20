import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss',
})
export class MyPostsComponent {
  user: any;
  posts: any;
  constructor(private postsService: PostService) {
    const userJson = localStorage.getItem('user') ?? '';
    this.user = JSON.parse(userJson);
    this.postsService.createdAndLiked(this.user.username).subscribe((respo) => {
      this.posts = respo;
    });
  }
}
