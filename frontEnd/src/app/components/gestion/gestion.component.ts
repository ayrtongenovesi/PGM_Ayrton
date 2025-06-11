import { Component, OnInit } from '@angular/core';
import { OtServiceService } from '../../../service/ot-service.service';
import { UserService } from '../../../service/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  edificios: any[] = [];
  pisos: any[] = [];
  sectores: any[] = [];
  ubicaciones: any[] = [];
  activos: any[] = [];
  usuarios: any[] = [];
  sections: any[] = [];
  isAdmin: boolean = false;

  constructor(private api: OtServiceService, private userService: UserService) {}

  ngOnInit(): void {
    const userType = this.userService.getIdTipoUsuario();
    this.isAdmin = userType === 2;
    this.loadAll();
  }

  loadAll() {
    forkJoin({
      edificios: this.api.getEdificio(''),
      pisos: this.api.getPiso(''),
      sectores: this.api.getSector(''),
      ubicaciones: this.api.getUbicacion(''),
      activos: this.api.getAT(''),
      usuarios: this.api.getUser('')
    }).subscribe(data => {
      this.edificios = data.edificios.map((e: any) => ({ id: e.id, Nombre: e.Nombre }));
      this.pisos = data.pisos.map((p: any) => ({ id: p.id, Nombre: p.Nombre }));
      this.sectores = data.sectores.map((s: any) => ({ id: s.id, Nombre: s.Sector, IdEdificio: s.IdEdificio || 1 }));
      this.ubicaciones = data.ubicaciones.map((u: any) => ({ id: u.id, Nombre: u.Nombre }));
      this.activos = data.activos.map((a: any) => ({ id: a.id, Nombre: a.Nombre }));
      this.usuarios = data.usuarios.map((u: any) => ({ id: u.id, Nombre: u.nombre }));
      this.sections = [
        { name: 'Edificios', data: this.edificios, key: 'edificio', open: false },
        { name: 'Pisos', data: this.pisos, key: 'piso', open: false },
        { name: 'Sectores', data: this.sectores, key: 'sector', open: false },
        { name: 'Ubicaciones', data: this.ubicaciones, key: 'ubicacion', open: false },
        { name: 'Activos', data: this.activos, key: 'activo', open: false },
        { name: 'Operarios', data: this.usuarios, key: 'usuario', open: false }
      ];
    });
  }

  add(model: any, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api.createEdificio({ id: model.id, Nombre: model.Nombre, Direccion: '' }).subscribe(() => this.loadAll());
        break;
      case 'piso':
        this.api.createPiso({ id: model.id, Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'sector':
        this.api.createSector({ id: model.id, Sector: model.Nombre, IdEdificio: 1 }).subscribe(() => this.loadAll());
        break;
      case 'ubicacion':
        this.api.createUbicacion({ id: model.id, Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'activo':
        this.api.createActivo({ id: model.id, Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'usuario':
        this.api.createUsuario({ name: model.Nombre, mail: '', password: '' }).subscribe(() => this.loadAll());
        break;
    }
  }

  remove(id: number, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api.deleteEdificio(id).subscribe(() => this.loadAll());
        break;
      case 'piso':
        this.api.deletePiso(id).subscribe(() => this.loadAll());
        break;
      case 'sector':
        this.api.deleteSector(id).subscribe(() => this.loadAll());
        break;
      case 'ubicacion':
        this.api.deleteUbicacion(id).subscribe(() => this.loadAll());
        break;
      case 'activo':
        this.api.deleteActivo(id).subscribe(() => this.loadAll());
        break;
      case 'usuario':
        this.api.deleteUsuario(id).subscribe(() => this.loadAll());
        break;
    }
  }

  update(model: any, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api.updateEdificio(model.id, { Nombre: model.Nombre, Direccion: '' }).subscribe(() => this.loadAll());
        break;
      case 'piso':
        this.api.updatePiso(model.id, { Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'sector':
        this.api.updateSector(model.id, { Sector: model.Nombre, IdEdificio: model.IdEdificio || 1 }).subscribe(() => this.loadAll());
        break;
      case 'ubicacion':
        this.api.updateUbicacion(model.id, { Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'activo':
        this.api.updateActivo(model.id, { Nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
      case 'usuario':
        this.api.updateUsuario(model.id, { nombre: model.Nombre }).subscribe(() => this.loadAll());
        break;
    }
  }

  toggle(section: any) {
    section.open = !section.open;
  }

  logout() {
    this.userService.logout();
    window.location.href = '/login';
  }
}
