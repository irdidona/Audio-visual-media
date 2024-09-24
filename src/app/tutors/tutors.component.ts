import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.css'
})
export class TutorsComponent implements OnInit {
  tutors = [
    { name: 'Tutor 1', bio: 'Bio for tutor 1', image: '/assets/tutor1.jpg' },
    { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
    { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
    { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },
    { name: 'Tutor 2', bio: 'Bio for tutor 2', image: '/assets/tutor1.jpg' },

    // Add more tutors here
  ];

  constructor() { }

  ngOnInit(): void { }
}