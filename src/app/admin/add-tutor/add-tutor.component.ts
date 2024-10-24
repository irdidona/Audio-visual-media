import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorService } from './tutor.service';
import { Tutor } from './Tutor.model';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  availableCourses: string[] = ['Math', 'Science', 'History', 'Programming'];

  constructor(
    private tutorService: TutorService,
    public dialogRef: MatDialogRef<AddTutorComponent>
  ) {}

  ngOnInit() {
    // Initialize the tutor object with default values
    this.tutor = new Tutor();
  }

  onSubmit() {
    console.log('Tutor Data:', this.tutor);
    // Call the service to send data to the backend
    this.tutorService.addTutor(this.tutor).subscribe((response) => {
      console.log('Tutor added successfully:', response);
      this.dialogRef.close();
    });
  }
}
