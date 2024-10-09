import { Component } from '@angular/core';
import { User } from '../user-profile/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, DropdownModule, ButtonModule, FormsModule, CommonModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  user: User = new User; // Create a new user object
  isEditMode: boolean = false;
  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Tutor', value: 'tutor' },
    { label: 'Student', value: 'student' }
  ];
  display: boolean = true;

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.user) {
      this.user = { ...data.user }; // Copy user data into the local object for editing
      this.isEditMode = true;
    }
  }

  onSave(): void {
    this.dialogRef.close(this.user); // Return the updated/new user data when the dialog is saved
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
