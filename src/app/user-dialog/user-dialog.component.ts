import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user-profile/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent {
  user: User = new User(); // Create a new user object
  isEditMode: boolean = false;
  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Tutor', value: 'tutor' },
    { label: 'Student', value: 'student' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
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
