import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Course } from '../../course-list/course.model'; // Ensure Course is a class or interface that can be instantiated
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.css'
})
export class CourseDialogComponent {
  course: Course = {
    id: 0,
    img: '',
    title: '',
    description: '',
    teacher: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    chapters: []
  };
  teachers: any[] = [];
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    if (data.course) {
      this.course = { ...data.course };
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.http.get<any[]>('http://localhost:3000/api/teachers').subscribe(
      (response) => {
        this.teachers = response;
      },
      (error) => {
        console.error('Failed to load teachers:', error);
      }
    );
  }

  onAddChapter(): void {
    this.dialogRef.close(this.course);
    const dialogRef = this.dialog.open(ChapterDialogComponent, {
      data: { 
        width: '50vw',  // Set dialog width to 50% of viewport width
        maxWidth: '300px',  // Set maximum width
        disableClose: true, 
        chapter: null },
    });

    dialogRef.afterClosed().subscribe((chapter) => {
      if (chapter) {
        console.log('Chapter added:', chapter);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.course);
  }
}
