import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Course } from '../../course-list/course.model';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from './course.service';
import { ChapterService } from '../chapter-dialog/chapter.service';
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';

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

  constructor(private courseService: CourseService, public dialog: MatDialog,
    private chapterService: ChapterService) { }

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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.courseService.createCourse(result).subscribe(() => {
        this.loadCourses();
      }, error => {
        console.error('Error adding course', error);
      });
    }
  });
  }

  editCourse(course: Course): void {
    // Logic for editing the course
    console.log('Edit course', course);

    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '50vw',  // Set dialog width to 50% of viewport width
      maxWidth: '400px',  // Set maximum width
      disableClose: true, 
      data: { course: course }  // Pass course data to dialog
    });
    dialogRef.afterClosed().subscribe(result => {
        if (course._id !== undefined) {
        this.courseService.updateCourse(course._id, result).subscribe(() => {
        this.loadCourses();
        }, error => {
        console.error('Error updating course', error);
        });
      }
    });
  }

  deleteCourse(course: Course): void {
    // Logic for deleting the course
    console.log('Delete course', course);

    const confirmDelete = confirm('Are you sure you want to delete this course?');
      if (course._id !== undefined) {
        this.courseService.deleteCourse(course._id).subscribe(() => {
        this.loadCourses();
      }, error => {
        console.error('Error deleting course', error);
      });
    }
  }

  onAddChapter(course: Course): void {

    const dialogRef = this.dialog.open(ChapterDialogComponent, {
      data: { 
        width: '50vw',  // Set dialog width to 50% of viewport width
        maxWidth: '300px',  // Set maximum width
        disableClose: true, 
        chapter: null,
        courseId: course._id  // Pass course ID to dialog
       },
    });

    dialogRef.afterClosed().subscribe((chapter) => {
      if (chapter) {
        console.log('Chapter:', chapter);
        course.chapters.push(chapter._id);
        console.log('Course:', course);
        this.courseService.updateCourse(course._id, course).subscribe(() => {
          this.loadCourses();
        }, error => {
          console.error('Error updating course', error);
        });
       
      }
    });

  }
}
