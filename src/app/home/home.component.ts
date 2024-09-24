import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { TutorsComponent } from '../tutors/tutors.component';
import { FooterComponent } from '../footer/footer.component';
import { CourseListComponent } from "../course-list/course-list.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [WelcomeComponent, TutorsComponent, FooterComponent, CourseListComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  // Method to navigate to course details page
  viewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  // Method to navigate to a specific section
  navigateTo(section: string): void {
    this.router.navigate([`/${section}`]);
  }
}