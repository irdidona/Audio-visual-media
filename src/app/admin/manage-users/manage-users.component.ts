import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../user-dialog/user-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbar,
    MatCard,
    MatTableModule,
    MatButton,
    CommonModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => (this.users = data),
      (error) => console.error('Error fetching users', error)
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => this.loadUsers(),
      (error) => console.error('Error deleting user', error)
    );
  }

  editUser(id: string) {
    console.log('Edit user', id);
    const user = this.users.find((u) => u.id === id);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      position: { top: '50%', left: '50%', bottom: '50%', right: '50%' },
      data: { user: user }, // Pass selected user data for editing
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call API to update the user
        this.userService.updateUser(user.id, result).subscribe(
          () => this.loadUsers(),
          (error) => console.error('Error updating user', error)
        );
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call API to add the user
        this.userService.addUser(result).subscribe(
          () => this.loadUsers(),
          (error) => console.error('Error adding user', error)
        );
      }
    });
  }
}
