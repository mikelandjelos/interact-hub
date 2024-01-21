import { Component } from '@angular/core';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostViewComponent } from '../post-view/post-view.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { HeaderComponent } from '../header/header.component';
import { JobofferdetailsComponent } from '../jobofferdetails/jobofferdetails.component';

@Component({
  selector: 'app-view-joboffer',
  standalone: true,
  imports: [CreatePostComponent,UserInfoComponent,PostViewComponent, ProfileCardComponent,HeaderComponent,JobofferdetailsComponent],
  templateUrl: './view-joboffer.component.html',
  styleUrl: './view-joboffer.component.scss'
})
export class ViewJobofferComponent {
  user:any;
  constructor(){
    
  }
}
