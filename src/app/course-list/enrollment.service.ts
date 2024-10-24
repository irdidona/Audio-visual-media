import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:3000/api/enrollments'; 


  constructor(private http: HttpClient) { }

  // Enroll a student in a course
  enrollStudent(courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-enrollment`, courseId);
  }

  // Unenroll a student from a course
  unenrollStudent(courseId: string, studentId: string): void {
  }

  // Get all enrolled students for a course
  getEnrolledStudents(courseId: string): string[] {
    // Add your code here
    return [];
  }

}