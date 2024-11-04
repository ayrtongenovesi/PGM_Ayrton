import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: { mail: string; contraseña: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: { nombre: string; mail: string; IdTipoUsuario: number; contraseña: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
