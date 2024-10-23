import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Tutor } from '../admin/add-tutor/Tutor.model';
import { TutorService } from '../admin/add-tutor/tutor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutors-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutors-page.component.html',
  styleUrl: './tutors-page.component.css'
})
export class TutorsPageComponent implements OnInit {
  tutors: Tutor[] = [];
  selectedTutor?: Tutor;

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getTutors().subscribe((data) => {
      this.tutors = data;
    });
  }

  selectTutor(tutor: Tutor): void {
    this.selectedTutor = tutor;
  }
}
