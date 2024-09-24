import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses/courses.component';
import { TutorsPageComponent } from './tutors-page/tutors-page.component';
import { CommunityComponent } from './community/community.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent
  },
  { path: 'tutors', component: TutorsPageComponent },
  {path: 'courses', component: CourseListComponent},
  { path: 'courses/:id', component: CoursesComponent },
  { path: 'course/add', component: CourseFormComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'course/edit/:id', component: CourseFormComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }];
