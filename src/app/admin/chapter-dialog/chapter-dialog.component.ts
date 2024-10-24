import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chapter } from '../../course-list/course.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChapterService } from './chapter.service';

@Component({
  selector: 'app-chapter-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './chapter-dialog.component.html',
  styleUrl: './chapter-dialog.component.css'
})
export class ChapterDialogComponent implements OnInit {
  chapter: Chapter = {
    title: '',
    description: '',
    videoUrl: '',
    explanation: '',
    quiz: [],
    courseId: ''
  };
  selectedFile: File | null = null;
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ChapterDialogComponent>,
    private chapterService: ChapterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data', data);
    if (data.chapter) {
      this.chapter = { ...data.chapter };
      this.isEditMode = true;
    }
    if (data.courseId) {
      this.chapter.courseId = data.courseId;
    }
  }
  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.chapter.videoUrl=file
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
  const formData=new FormData();
  formData.append('title',this.chapter.title);
  formData.append('description',this.chapter.description);
  formData.append('explanation',this.chapter.explanation);

  formData.append('video',this.chapter.videoUrl, this.chapter.videoUrl.name);

  formData.append('courseId',this.chapter.courseId);
 
  console.log(formData)
  console.log(this.chapter.courseId)
  this.chapterService.createChapter(formData).subscribe((response) => {
    console.log('Chapter created:', response);
  
    this.dialogRef.close(response);

  }, (error) => {
    console.error('Failed to create chapter:', error);

  });

  }
}
