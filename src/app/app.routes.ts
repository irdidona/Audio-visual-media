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
import { AddTutorComponent } from './admin/add-tutor/add-tutor.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCoursesComponent } from './admin/manage-courses/manage-courses.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { adminGuard } from './admin.guard';
import { TutorsComponent } from './tutors/tutors.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'tutors', component: TutorsComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CoursesComponent },
  { path: 'course/add', component: CourseFormComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'course/edit/:id', component: CourseFormComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [adminGuard], // Admin guard to protect these routes
    children: [
      { path: 'add-tutor', component: AddTutorComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-courses', component: ManageCoursesComponent },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
