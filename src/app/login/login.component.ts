import { Component } from '@angular/core';
import { AuthService } from '../authService.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
