import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Course } from '../../course-list/course.model'; 
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ChapterDialogComponent } from '../chapter-dialog/chapter-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TutorService } from '../add-tutor/tutor.service';

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
    private dialog: MatDialog,
    private tutorService: TutorService
  ) {
    if (data.course) {
      this.course = { ...data.course };
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log('Reader:', reader);
      reader.onload = () => {
        console.log('Reader result:', reader.result);
        this.course.img = reader.result as Buffer;
        console.log('course image:', this.course.img);
      };
      reader.onerror = (error) => {
        console.error('Error converting file to base64:', error);
      };
    }
  }


  loadTeachers(): void {
    this.tutorService.getTutors().subscribe(
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
