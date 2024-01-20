import { Component } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostViewComponent } from '../post-view/post-view.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [CreatePostComponent,UserInfoComponent,PostViewComponent, ProfileCardComponent,HeaderComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {

}
