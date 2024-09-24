import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Angular',
      description: 'Learn Angular basics',
      teacher: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      chapters: [
        {
          title: 'Getting Started with Angular',
          videoUrl: 'https://example.com/video1',
          description: 'An introduction to Angular framework.',
          explanation: 'Angular is a platform for building mobile and desktop web applications.',
          quiz: [
            {
              question: 'What is Angular?',
              options: ['A framework', 'A library', 'A language', 'An IDE'],
              correctAnswer: 'A framework'
            }
          ]
        },
        {
          title: 'Components and Templates',
          videoUrl: 'https://example.com/video2',
          description: 'Understanding components and templates in Angular.',
          explanation: 'Components are the building blocks of Angular applications.',
          quiz: []
        }
      ]
    },
    // Add more courses as needed
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  addCourse(course: Course): Observable<void> {
    course.id = this.courses.length + 1; // Simple ID generation
    this.courses.push(course);
    return of();
  }

  updateCourse(id: number, updatedCourse: Course): Observable<void> {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...updatedCourse, id };
    }
    return of();
  }

  deleteCourse(id: number): Observable<void> {
    this.courses = this.courses.filter(c => c.id !== id);
    return of();
  }
}
