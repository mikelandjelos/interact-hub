import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { HeaderComponent } from './header/header.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponentComponent },
  { path: 'signUp', pathMatch: 'full', component: LoginComponentComponent },
  { path: 'myprofile', pathMatch: 'full', component: MyProfileComponent },
  { path: '', pathMatch: 'full', component: FrontPageComponent },
  { path: 'a', pathMatch: 'full', component: HeaderComponent },
];
