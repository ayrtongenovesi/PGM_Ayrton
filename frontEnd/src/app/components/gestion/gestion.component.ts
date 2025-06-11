import { Component, OnInit } from '@angular/core';
import { OtServiceService } from '../../../service/ot-service.service';

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

  constructor(private api: OtServiceService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.api.getEdificio('').subscribe(d => this.edificios = d);
    this.api.getPiso('').subscribe(d => this.pisos = d);
    this.api.getSector('').subscribe(d => this.sectores = d);
    this.api.getUbicacion('').subscribe(d => this.ubicaciones = d);
    this.api.getAT('').subscribe(d => this.activos = d);
    this.api.getUser('').subscribe(d => this.usuarios = d);
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
}
