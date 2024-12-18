import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorService } from './tutor.service';
import { Tutor } from './Tutor.model';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourseService } from '../manage-courses/course.service';

@Component({
  selector: 'app-add-tutor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './add-tutor.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AddTutorComponent implements OnInit {
  tutor: Tutor = new Tutor();
  availableCourses: string[] = [];
  isEditMode: boolean = false;

  constructor(
    private tutorService: TutorService,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<AddTutorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.tutor ) {
      this.tutor = { ...data.tutor };
      this.isEditMode = true;
    }
  }

  ngOnInit() {
    // Initialize the tutor object with default values
    //this.tutor = new Tutor();
    this.courseService.getCourses().subscribe((courses) => {
      this.availableCourses = courses.map((course) => course.title);
    });

  }

  onSubmit() {
    console.log('Tutor Data:', this.tutor);
    // Call the service to send data to the backend
    this.dialogRef.close(this.tutor);
   
  }
}
