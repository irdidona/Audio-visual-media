import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private user: any = { role: 'admin' }; // Simulating an admin user for now


  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}


  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    this.loggedIn.next(true);
    console.log('Login', credentials);
  
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login successful', response);

        this.localStorageService.setItem('token', response.token);
        this.localStorageService.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
        this.loggedIn.next(true);
      })
    );
  }
  
  isLoggedIn(): Observable<boolean> {
    // This should be replaced with a real API call
    const token = this.localStorageService.getItem('token');
      // Check if the token exists and is valid (e.g., using a library like jwt-decode)
    return this.loggedIn.asObservable().pipe(
      map((loggedIn: any) => loggedIn && !!token)
    );
    
  }

  getUserStatus(): Observable<any> {
    return this.userSubject.asObservable();
  }

  logout() {
    this.loggedIn.next(false);
    // Perform logout logic, such as clearing token
  }

  getUser() {
    return this.user;
  }
}
