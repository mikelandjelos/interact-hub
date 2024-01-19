import { Component } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostViewComponent } from '../post-view/post-view.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CreatePostComponent,UserInfoComponent,PostViewComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {

}
