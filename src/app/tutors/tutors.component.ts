import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tutor } from '../admin/add-tutor/Tutor.model';
import { TutorService } from '../admin/add-tutor/tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.css'
})
export class TutorsComponent implements OnInit {
  // tutors = [
  //   { name: 'Tutor 1', bio: 'Bio for tutor 1', image: '/assets/tutor1.jpg' },
  //   { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
  //   { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
  //   { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
  //   { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },

  //   // Add more tutors here
  // ];

  tutors: Tutor[] = [];

  constructor(private tutorService: TutorService, private router: Router) { }

  ngOnInit(): void {
    this.loadTutors();
   }

   loadTutors(): void {
    this.tutorService.getTutors().subscribe(data => {
      this.tutors = data;
    });
  }

  openTutorPage(tutor: Tutor): void {
    // Open the tutor page
    // this.router.navigate(['/tutor', tutor.id]);
    console.log('Open tutor page:', tutor);
    
  }
}