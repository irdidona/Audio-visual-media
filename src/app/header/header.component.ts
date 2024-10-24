import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService.service'; 
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';

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

  constructor(private authService: AuthService, private router: Router,private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      console.log('isLoggedIn', loggedIn);
      this.isLoggedIn = loggedIn;
    });

    this.authService.getUserStatus().subscribe((user) => {
      this.isLoggedIn = !!user;
      console.log('User:', user);
      if (user) {
        this.userName = user.name;  // Assuming the user object contains a name property
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
