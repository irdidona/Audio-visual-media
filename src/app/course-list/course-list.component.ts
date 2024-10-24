import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../admin/manage-courses/course.service';
import { Course } from './course.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../authService.service';
import { EnrollmentService } from './enrollment.service';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';

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
  enrolledCourses: Set<string> = new Set(); // To store the IDs of enrolled courses


  constructor(private courseService: CourseService, 
    private sanitizer: DomSanitizer, 
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private localStorageService: LocalStorageService) {}


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
    this.enrolledCourses.add(course._id); // Add the course ID to the set
    this.saveEnrollment(course); // Save the enrollment data to the backend
  }

  saveEnrollment(course: Course): void {
    const token = this.localStorageService.getItem('token'); // Get the token from localStorage or a service
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const user = this.localStorageService.getItem('user'); // Get the user ID from localStorage or a service

    console.log("token", token);
    console.log("user", user);
    console.log('Enrolling in course:', course);
    this.enrollmentService.enrollStudent(course._id).subscribe(() => {
      console.log('Enrolled in course:', course);
      this.isEnrolled = true;
    }, (error: Error) => {
      console.error('Error enrolling in course:', error);
    });
  }

  isCourseEnrolled(courseId: string): boolean {
    return this.enrolledCourses.has(courseId);
  }
}