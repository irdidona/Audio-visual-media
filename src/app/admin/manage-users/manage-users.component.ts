import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { use } from 'video.js/dist/types/tech/middleware';


@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [MatIconModule, MatToolbar, MatCard, MatTableModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {

  users: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => this.loadUsers(),
      error => console.error('Error deleting user', error)
    );
  }

  editUser(id: string) {
    console.log('Edit user', id);
    let user = this.userService.getUser(id);
    this.userService.updateUser(id,user).subscribe(
      () => this.loadUsers(),
      error => console.error('Error updating user', error)
    ); 
  }

  addUser() {
   console.log('Add user');
  }
}
