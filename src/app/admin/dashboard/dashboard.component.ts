import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AddTutorComponent } from '../add-tutor/add-tutor.component';
import { MatDialog } from '@angular/material/dialog';
import { TutorService } from '../add-tutor/tutor.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tutorService: TutorService
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  addTutor() {
    const dialogRef = this.dialog.open(AddTutorComponent, {
      width: '500px',
      data: { tutor: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tutorService.addTutor(result).subscribe(
          () => console.log(),
          (error) => console.error('Error adding user', error)
        );
      }
    });
  }
}
