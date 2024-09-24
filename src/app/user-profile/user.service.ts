import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate developer.',
    profilePictureUrl: 'https://example.com/profile.jpg'
  };

  getUserProfile(): Observable<User> {
    return of(this.currentUser);
  }

  updateUserProfile(updatedUser: User): Observable<void> {
    this.currentUser = { ...this.currentUser, ...updatedUser };
    return of();
  }
}
