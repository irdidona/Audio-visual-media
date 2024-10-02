import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      img: 'data:image/png;base64,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',
      title: 'Introduction to Angular',
      description:
        'This angular course is for the beginners who wants to kickstart his career in angular. Angular can be a difficult topic to grasp in the beginning, with this tutorial, you can gain a solid understanding of how to get started  with  the help of a project.',
      teacher: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      chapters: [
        {
          title: 'Getting Started with Angular',
          videoUrl: 'https://example.com/video1',
          description: 'An introduction to Angular framework.',
          explanation:
            'Angular is a platform for building mobile and desktop web applications.',
          quiz: [
            {
              question: 'What is Angular?',
              options: ['A framework', 'A library', 'A language', 'An IDE'],
              correctAnswer: 'A framework',
            },
          ],
        },
        {
          title: 'Components and Templates',
          videoUrl: 'https://example.com/video2',
          description: 'Understanding components and templates in Angular.',
          explanation:
            'Components are the building blocks of Angular applications.',
          quiz: [],
        },
      ],
    },
    // Add more courses as needed
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find((c) => c.id === id);
    return of(course);
  }

  addCourse(course: Course): Observable<void> {
    course.id = this.courses.length + 1; // Simple ID generation
    this.courses.push(course);
    return of();
  }

  updateCourse(id: number, updatedCourse: Course): Observable<void> {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.courses[index] = { ...updatedCourse, id };
    }
    return of();
  }

  deleteCourse(id: number): Observable<void> {
    this.courses = this.courses.filter((c) => c.id !== id);
    return of();
  }
}
