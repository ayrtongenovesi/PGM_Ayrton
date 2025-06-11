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
      this.edificios = data.edificios;
      this.pisos = data.pisos;
      this.sectores = data.sectores;
      this.ubicaciones = data.ubicaciones;
      this.activos = data.activos;
      this.usuarios = data.usuarios;
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
        this.api.createEdificio(model).subscribe(() => this.loadAll());
        break;
      case 'piso':
        this.api.createPiso(model).subscribe(() => this.loadAll());
        break;
      case 'sector':
        this.api.createSector(model).subscribe(() => this.loadAll());
        break;
      case 'ubicacion':
        this.api.createUbicacion(model).subscribe(() => this.loadAll());
        break;
      case 'activo':
        this.api.createActivo(model).subscribe(() => this.loadAll());
        break;
      case 'usuario':
        this.api.createUsuario(model).subscribe(() => this.loadAll());
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
        this.api.updateEdificio(model.id, model).subscribe(() => this.loadAll());
        break;
      case 'piso':
        this.api.updatePiso(model.id, model).subscribe(() => this.loadAll());
        break;
      case 'sector':
        this.api.updateSector(model.id, model).subscribe(() => this.loadAll());
        break;
      case 'ubicacion':
        this.api.updateUbicacion(model.id, model).subscribe(() => this.loadAll());
        break;
      case 'activo':
        this.api.updateActivo(model.id, model).subscribe(() => this.loadAll());
        break;
      case 'usuario':
        this.api.updateUsuario(model.id, model).subscribe(() => this.loadAll());
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
