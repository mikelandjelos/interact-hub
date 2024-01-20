import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FrontPageComponent } from './front-page/front-page.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponentComponent },
  { path: 'signUp', pathMatch: 'full', component: LoginComponentComponent },
  { path: '', pathMatch: 'full', component: FrontPageComponent },
];
