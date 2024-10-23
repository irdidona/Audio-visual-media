import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../admin/manage-courses/course.service';
import { Course } from './course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('Getting courses...');
    this.courseService.getCourses().subscribe(data => {
      console.log("Kurseeeeettttt",data);
      
      this.courses = data;
    });
  }
}