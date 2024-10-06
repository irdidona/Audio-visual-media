import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextareaModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    bio: '',
    profilePictureUrl: '',
  };
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.user = user;
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    if (this.user) {
      this.userService.updateUserProfile(this.user).subscribe(() => {
        this.isEditing = false;
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.ngOnInit(); // Re-fetch user data to reset the form
  }
}
