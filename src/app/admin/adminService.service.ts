import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  addTutor(tutor: any) {
    return this.http.post(`${this.apiUrl}/add-tutor`, tutor);
  }

  manageUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  manageCourses() {
    return this.http.get(`${this.apiUrl}/courses`);
  }
}
