import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../admin/manage-courses/course.service';
import { Course, Chapter } from '../course-list/course.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course!: Course;
  selectedChapter?: Chapter;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(courseId).subscribe((course: any) => {
      this.course = course;
      console.log('Course:', course);
      this.selectedChapter = course.chapters[0]; // Default to the first chapter
    });
  }

  selectChapter(chapter: Chapter): void {
    this.selectedChapter = chapter;
  }
}
