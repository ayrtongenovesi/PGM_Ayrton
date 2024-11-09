import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/auth/';
  private loggedIn: boolean = false; 

  constructor(private http: HttpClient) {

    this.loggedIn = !!localStorage.getItem('token'); 
  }

  login(credentials: { mail: string; contraseña: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        
        localStorage.setItem('token', response.token); 
        this.loggedIn = true;

        const decodedToken: any = jwt_decode.jwtDecode(response.token);
        localStorage.setItem('IdTipoUsuario', decodedToken.IdTipoUsuario);
      })
    );
  }

  register(userData: { nombre: string; mail: string; IdTipoUsuario: number; contraseña: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('IdTipoUsuario'); 
    this.loggedIn = false; 
  }

  checkLoginStatus(): boolean {
    return this.loggedIn; 
  }

  getIdTipoUsuario(): number {
    const IdTipoUsuario = localStorage.getItem('IdTipoUsuario');
    return IdTipoUsuario ? parseInt(IdTipoUsuario, 10) : 0; 
}
}