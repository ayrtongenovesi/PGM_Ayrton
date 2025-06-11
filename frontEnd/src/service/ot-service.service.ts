import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrdenTrabajo {
  id: number;
  Edificio: string;
  Piso: string;
  Ubicacion: string;
  Sector: string;
  Tipo_Activo: string;
  usuarios: string;
  Tareas: string;
  fecha?: string;
  disponible?: string;
}

export interface Tarea {
  id: number;
  Descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class OtServiceService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ----- Orden de Trabajo -----
  getOT(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/ot`);
  }

  createOT(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ot/create`, data);
  }

  deleteOT(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ot/delete/${id}`);
  }

  updateEstadoOT(id: number, estado: string | boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/ot/edit/${id}`, { estado });
  }

  // ----- Tareas -----
  getTarea(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/tareas`);
  }

  createTarea(data: { id: number; descripcion: string }): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.apiUrl}/tareas/create`, data);
  }

  updateTarea(id: number, data: { descripcion: string }): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/tareas/edit/${id}`, data);
  }

  deleteTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tareas/delete/${id}`);
  }

  // ----- Datos de apoyo -----
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

  // ----- CRUD auxiliares -----
  createEdificio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/edificio/create`, data);
  }

  updateEdificio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edificio/edit/${id}`, data);
  }

  deleteEdificio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/edificio/delete/${id}`);
  }

  createPiso(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/piso/create`, data);
  }

  updatePiso(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/piso/edit/${id}`, data);
  }

  deletePiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/piso/delete/${id}`);
  }

  createSector(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sector/create`, data);
  }

  updateSector(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sector/edit/${id}`, data);
  }

  deleteSector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sector/delete/${id}`);
  }

  createUbicacion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ubicacion/create`, data);
  }

  updateUbicacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/ubicacion/edit/${id}`, data);
  }

  deleteUbicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ubicacion/delete/${id}`);
  }

  createActivo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/activo/create`, data);
  }

  updateActivo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/activo/edit/${id}`, data);
  }

  deleteActivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/activo/delete/${id}`);
  }

  createUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/`, data);
  }

  updateUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/edit/${id}`, data);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuario/${id}`);
  }
}
