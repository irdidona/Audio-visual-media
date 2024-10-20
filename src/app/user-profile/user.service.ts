import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: ' I’m a web developer with in-depth experience in UI/UX design. In a nutshell, I create websites that help organizations address business challenges and meet their needs. I manage everything from website navigation and layout to a company’s web hosting and security architecture. My expertise lies within front-end web apps, and the main languages in my tech stack are JavaScript, React, and of course HTML/CSS. ',
    profilePicture:
      'data:image/jpeg;base64,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',
  };

  getUserProfile(): Observable<User> {
    return of(this.currentUser);
  }

  updateUserProfile(updatedUser: User): Observable<void> {
    this.currentUser = { ...this.currentUser, ...updatedUser };
    return of();
  }
}
