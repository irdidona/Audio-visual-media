import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:3000/api/enrollments'; 


  constructor() { }

  // Enroll a student in a course
  enrollStudent(courseId: string, studentId: string): void {
    // Add your code here
    this.enrollStudent(courseId, studentId);
  }

  // Unenroll a student from a course
  unenrollStudent(courseId: string, studentId: string): void {
    // Add your code here
  }

  // Get all enrolled students for a course
  getEnrolledStudents(courseId: string): string[] {
    // Add your code here
    return [];
  }

}