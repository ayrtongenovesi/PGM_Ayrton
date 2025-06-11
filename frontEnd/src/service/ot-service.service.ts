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

  createTarea(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tareas/create`, data);
  }
  updateTarea(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tareas/edit${id}`, data);
  }
  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tareas/delete${id}`);
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

  // Gestion CRUD methods
  createEdificio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/edificio/create`, data);
  }
  updateEdificio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edificio/edit/${id}`, data);
  }
  deleteEdificio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/edificio/delete/${id}`);
  }

  createPiso(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/piso/create`, data);
  }
  updatePiso(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/piso/edit/${id}`, data);
  }
  deletePiso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/piso/delete/${id}`);
  }

  createSector(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sector/create`, data);
  }
  updateSector(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sector/edit/${id}`, data);
  }
  deleteSector(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sector/delete/${id}`);
  }

  createUbicacion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ubicacion/create`, data);
  }
  updateUbicacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/ubicacion/edit/${id}`, data);
  }
  deleteUbicacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ubicacion/delete/${id}`);
  }

  createActivo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/activo/create`, data);
  }
  updateActivo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/activo/edit/${id}`, data);
  }
  deleteActivo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activo/delete/${id}`);
  }

  createUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/`, data);
  }
  updateUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario`, data);
  }
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }
}






