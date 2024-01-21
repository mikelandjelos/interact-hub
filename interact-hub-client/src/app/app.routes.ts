import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { HeaderComponent } from './header/header.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { JobofferComponent } from './joboffer/joboffer.component';
import { ViewJobofferComponent } from './view-joboffer/view-joboffer.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponentComponent },
  { path: 'signUp', pathMatch: 'full', component: LoginComponentComponent },
  { path: 'myprofile', pathMatch: 'full', component: MyProfileComponent },
  { path: '', pathMatch: 'full', component: FrontPageComponent },
  { path: 'createcompany', pathMatch: 'full', component: CreateCompanyComponent },
  { path: 'joboffer', pathMatch: 'full', component: JobofferComponent },
  { path: 'viewjoboffers', pathMatch: 'full', component: ViewJobofferComponent },
];
