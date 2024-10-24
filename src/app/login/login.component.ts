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
    console.log('Login', this.credentials);
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        // this.localStorageService.setItem('token', response.token);
        if (response.role === 'admin') {
         this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/']);

        }

      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
