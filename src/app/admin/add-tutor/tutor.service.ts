import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from './Tutor.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = 'http://localhost:3000/api/admin'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addTutor(tutorData: Tutor): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-tutor`, tutorData);
  }
}