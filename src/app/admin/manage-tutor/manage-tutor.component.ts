import { Component } from '@angular/core';
import { TutorService } from '../add-tutor/tutor.service';
import { Tutor } from '../add-tutor/Tutor.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTutorComponent } from '../add-tutor/add-tutor.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-tutor',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbar,
    MatCard,
    MatTableModule,
    MatButton,
    CommonModule,
  ],
  templateUrl: './manage-tutor.component.html',
  styleUrl: './manage-tutor.component.css'
})
export class ManageTutorComponent {
  tutors: Tutor[] = [];
  displayedColumns: string[] = ['name', 'email', 'bio', 'actions'];

  constructor(private tutorService: TutorService, public dialog: MatDialog,) { }


  ngOnInit() {
    this.loadTutors();
  }

  loadTutors() {
    this.tutorService.getTutors().subscribe((data: any) => {
      this.tutors = data;
    });
  }

  openAddTutorDialog() {
    const dialogRef = this.dialog.open(AddTutorComponent, {
      width: '400px',
      data: { tutor: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Tutor Data1111:', result);
        this.tutorService.addTutor(result).subscribe((response) => {
          console.log('Tutor added successfully:', response);
          this.loadTutors();
        });
       
      }
    });
  }

  editTutor(tutor: any) {
    const dialogRef = this.dialog.open(AddTutorComponent, {
      width: '400px',
      data: { tutor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tutorService.editTutor(result).subscribe(() => {
          this.loadTutors();
        });
      }
    });
  }

  deleteTutor(id: string) {
    this.tutorService.deleteTutor(id).subscribe(() => {
      this.loadTutors();
    });
  }

}
