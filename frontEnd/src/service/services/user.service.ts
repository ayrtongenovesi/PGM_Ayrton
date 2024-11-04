import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/auth/';
  private loggedIn: boolean = false; // Private property

  constructor(private http: HttpClient) {
    // Check for a token in local storage on initialization
    this.loggedIn = !!localStorage.getItem('token'); 
  }

  login(credentials: { mail: string; contraseña: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Assuming the response contains a token
        localStorage.setItem('token', response.token); // Store the token
        this.loggedIn = true; // Update the logged-in status
      })
    );
  }

  register(userData: { nombre: string; mail: string; IdTipoUsuario: number; contraseña: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token from storage
    this.loggedIn = false; // Update the logged-in status
  }

  checkLoginStatus(): boolean {
    return this.loggedIn; // Return the current logged-in status
  }
}
