import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TutorService } from './tutor.service';
import { Tutor } from './Tutor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tutor.component.html'
})
export class AddTutorComponent implements OnInit {
  tutor: Tutor = new Tutor();
  availableCourses: string[] = ['Math', 'Science', 'History', 'Programming'];

  constructor(private tutorService: TutorService) {}

  ngOnInit() {
    // Initialize the tutor object with default values
    this.tutor = new Tutor();
  }

  onSubmit() {
    console.log('Tutor Data:', this.tutor);
    // Call the service to send data to the backend
    this.tutorService.addTutor(this.tutor).subscribe(response => {
      console.log('Tutor added successfully:', response);
    });
  }
}
