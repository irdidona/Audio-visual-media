import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chapter } from '../../course-list/course.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    quiz: []
  };
  selectedFile: File | null = null;
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ChapterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.chapter) {
      this.chapter = { ...data.chapter };
      this.isEditMode = true;
    }
  }
  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // if (this.selectedFile) {
    //   this.chapter.videoUrl = this.selectedFile;
    // }
    this.dialogRef.close(this.chapter);
  }
}
