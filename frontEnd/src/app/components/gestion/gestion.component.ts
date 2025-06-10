import { Component, OnInit } from '@angular/core';
import { OtServiceService } from '../../../service/ot-service.service';
import { Usuario } from '../../interfaces/usuario';
import { Piso } from '../../interfaces/piso';

@Component({
  selector: 'app-gestion',
  template: `
    <div class="gestion-container">
      <h2>Operarios</h2>
      <div class="add-form">
        <input [(ngModel)]="nuevoUsuario.nombre" placeholder="Nombre">
        <input [(ngModel)]="nuevoUsuario.mail" placeholder="Mail">
        <input [(ngModel)]="nuevoUsuario['contraseña']" placeholder="Contraseña">
        <button (click)="addUsuario()">Agregar</button>
      </div>
      <ul>
        <li *ngFor="let u of usuarios">
          <input [(ngModel)]="u.nombre">
          <button (click)="updateUsuario(u)">Guardar</button>
          <button (click)="deleteUsuario(u.id_usuarios)">Eliminar</button>
        </li>
      </ul>

      <h2>Pisos</h2>
      <div class="add-form">
        <input [(ngModel)]="nuevoPiso" placeholder="Nombre">
        <button (click)="addPiso()">Agregar</button>
      </div>
      <ul>
        <li *ngFor="let p of pisos">
          <input [(ngModel)]="p.nombre">
          <button (click)="updatePiso(p)">Guardar</button>
          <button (click)="deletePiso(p.id_piso)">Eliminar</button>
        </li>
      </ul>
    </div>
  `,
  styles: `
    .gestion-container{padding:1rem;}
    .add-form input{margin-right:0.5rem;}
    ul{list-style:none;padding:0;}
    li{margin-bottom:0.5rem;}
  `
})
export class GestionComponent implements OnInit {
  usuarios: Usuario[] = [];
  pisos: Piso[] = [];
  nuevoUsuario: Partial<Usuario> = {};
  nuevoPiso: string = '';

  constructor(private api: OtServiceService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getUser('').subscribe(d => this.usuarios = Array.isArray(d) ? d : [d]);
    this.api.getPiso('').subscribe(d => this.pisos = Array.isArray(d) ? d : [d]);
  }

  addUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.mail || !this.nuevoUsuario['contraseña']) return;
    this.api.createUsuario(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = {};
      this.loadData();
    });
  }

  updateUsuario(u: Usuario): void {
    this.api.updateUsuario(u.id_usuarios, u.nombre).subscribe(() => this.loadData());
  }

  deleteUsuario(id: number): void {
    this.api.deleteUsuario(id).subscribe(() => this.loadData());
  }

  addPiso(): void {
    if (!this.nuevoPiso) return;
    this.api.createPiso(this.nuevoPiso).subscribe(() => {
      this.nuevoPiso = '';
      this.loadData();
    });
  }

  updatePiso(p: Piso): void {
    this.api.updatePiso(p.id_piso, p.nombre).subscribe(() => this.loadData());
  }

  deletePiso(id: number): void {
    this.api.deletePiso(id).subscribe(() => this.loadData());
  }
}
