import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class OtServicio {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCUIA(cuia: string): Observable<any> {
    const params = new HttpParams().set('cuia', cuia);
    return this.http.get(`${this.apiUrl}/cuia`, { params });
  }

  getEdificio(edificio: string): Observable<any> {
    const params = new HttpParams().set('edificio', edificio);
    return this.http.get(`${this.apiUrl}/edificio`, { params });
  }

  getSector(sector: string): Observable<any> {
    const params = new HttpParams().set('sector', sector);
    return this.http.get(`${this.apiUrl}/sector`, { params });
  }

  getPiso(piso: string): Observable<any> {
    const params = new HttpParams().set('piso', piso);
    return this.http.get(`${this.apiUrl}/piso`, { params });
  }

  getAT(user: string): Observable<any> {
    const params = new HttpParams().set('user', user);
    return this.http.get(`${this.apiUrl}/activo`, { params });
  }

  getUser(operario: string): Observable<any> {
    const params = new HttpParams().set('operario', operario);
    return this.http.get(`${this.apiUrl}/operario`, { params });
  }
}

