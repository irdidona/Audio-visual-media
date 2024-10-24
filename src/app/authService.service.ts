import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private user: any = { role: 'admin' }; // Simulating an admin user for now


  constructor(private http: HttpClient) {}


  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    this.loggedIn.next(true);
    console.log('Login', credentials);
  
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login successful', response);

        localStorage.setItem('token', response.token);
        this.userSubject.next(response);
        this.loggedIn.next(true);
      })
    );
  }
  
  isLoggedIn(): Observable<boolean> {
    // This should be replaced with a real API call
    return this.loggedIn.asObservable();
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
