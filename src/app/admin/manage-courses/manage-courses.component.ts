import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Course } from '../../course-list/course.model';
import { CourseService } from '../../course-list/course.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [MatIconModule, MatToolbar, MatCard, MatTableModule, MatButton, CommonModule],
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'updatedAt', 'teacher', 'chaptersCount', 'actions'];

  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    }, error => {
      console.error('Error fetching courses', error);
    });
  }

  addCourse(): void { 
    // Logic for adding a new course
    console.log('Add course');

    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '50vw',  // Set dialog width to 50% of viewport width
      maxWidth: '400px',  // Set maximum width
      disableClose: true, 
      data: { course: null }  // No user data for add user dialog
    });
  }

  editCourse(course: Course): void {
    // Logic for editing the course
    console.log('Edit course', course);
  }

  deleteCourse(course: Course): void {
    // Logic for deleting the course
    console.log('Delete course', course);
  }
}
