import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService.service'; 
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      console.log('isLoggedIn', loggedIn);
      this.isLoggedIn = loggedIn;
    });

    this.authService.getUserStatus().subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.name;  // Assuming the user object contains a name property
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
