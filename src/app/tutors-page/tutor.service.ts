import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tutor } from './tutors.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private tutors: Tutor[] = [
    {
        id: 1,
        name: 'John Doe',
        bio: 'Expert in Angular and frontend development.',
        courses: [
            {
                id: 1,
                title: 'Introduction to Angular',
                description: 'Learn Angular basics',
                teacher: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                chapters: []
            },
            {
                id: 2,
                title: 'Advanced Angular',
                description: 'Dive deep into Angular.',
                teacher: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                chapters: []
            }
        ],
        isLiveStreaming: true,
        profilePictureUrl: ''
    },
    {
        id: 2,
        name: 'Jane Smith',
        bio: 'Full-stack developer with a passion for teaching.',
        courses: [
            {
                id: 3,
                title: 'Full-stack Development with Node.js',
                description: 'Learn to build full-stack applications.',
                teacher: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                chapters: []
            }
        ],
        isLiveStreaming: false,
        profilePictureUrl: ''
    }
    // Add more tutors as needed
  ];

  getTutors(): Observable<Tutor[]> {
    return of(this.tutors);
  }

  getTutorById(id: number): Observable<Tutor | undefined> {
    const tutor = this.tutors.find(t => t.id === id);
    return of(tutor);
  }

  addTutor(tutor: Tutor): Observable<void> {
    tutor.id = this.tutors.length + 1; // Simple ID generation
    this.tutors.push(tutor);
    return of();
  }

  updateTutor(id: number, updatedTutor: Tutor): Observable<void> {
    const index = this.tutors.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tutors[index] = { ...updatedTutor, id };
    }
    return of();
  }

  deleteTutor(id: number): Observable<void> {
    this.tutors = this.tutors.filter(t => t.id !== id);
    return of();
  }
}
