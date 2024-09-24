import { Component } from '@angular/core';
import { AuthService } from '../authService.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user = {
    name: '',
    email: '',
    password: '',
    role: 'student'
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('User', this.user);
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Registration failed', error.message);
        console.error('Registration failed', error.message);
      }
    );
  }

}
