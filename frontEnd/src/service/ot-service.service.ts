import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdenTrabajo {
  id: number;
  Edificio: string;
  Piso: string;
  Sector: string;
  Ubicacion: string;
  Tipo_Activo: string;
  Tareas: string;
}

@Injectable({
  providedIn: 'root'

})

export class OtServiceService {

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

  getUser(usuario: string): Observable<any> {
    const params = new HttpParams().set('usuario', usuario);
    return this.http.get(`${this.apiUrl}/usuario`, { params });
  }

  getUbicacion(ubicacion: string): Observable<any> {
    const params = new HttpParams().set('ubicacion', ubicacion);
    return this.http.get(`${this.apiUrl}/ubicacion`, { params });
  }

  getTarea(tarea: string): Observable<any> {
    const params = new HttpParams().set('tareas', tarea);
    return this.http.get(`${this.apiUrl}/tareas`, { params });
  }

  createOT(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ot/create`, datos); 
  }

  getOT(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/ot`);
  }

  updateEstadoOT(id: number, estado: string | boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/ot/edit/${id}`, { estado });
  }

  deleteOT(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ot/delete${id}`);
  }

  // Gestion APIs
  createPiso(nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/piso/create`, { nombre });
  }

  updatePiso(id: number, nombre: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/piso/edit${id}`, { nombre });
  }

  deletePiso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/piso/delete${id}`);
  }

  createUsuario(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/`, userData);
  }

  updateUsuario(id: number, nombre: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario`, { id, nombre });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }
}





