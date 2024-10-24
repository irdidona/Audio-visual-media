import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../admin/manage-courses/course.service';
import { Course } from './course.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../authService.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  isLoggedIn = false;
  isEnrolled: Boolean = false;

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer, private authService: AuthService) {}


  ngOnInit(): void {
    console.log('Getting courses...');
    this.loadCourses();

    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      console.log('isLoggedIn', loggedIn);
      this.isLoggedIn = loggedIn;
    });
  }



  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      console.log('Courses:', data);
      this.courses = data.map(course => {
        if (course.imageUrl) {
          course.imageUrl = this.convertToImageUrl(course.imageUrl);
        }
        return course;
      });
      //this.courses = data;
      console.log('Courses:', this.courses);
    });
  }

  convertToImageUrl(bufferData: any): any {
    const byteArray = new Uint8Array(bufferData);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Use the correct MIME type here
    const objectURL = URL.createObjectURL(blob);
    // Sanitize the Blob URL to make it safe for Angular
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  enroll(course: Course): void {
    console.log('Enroll:', course);
    this.isEnrolled = true;
  }
}