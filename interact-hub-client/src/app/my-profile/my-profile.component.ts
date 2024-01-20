import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { MyPostsComponent } from '../my-posts/my-posts.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [HeaderComponent,CreatePostComponent,UserInfoComponent,MyPostsComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

}
