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
  tareas: any[] = [];
  sections: any[] = [];
  isAdmin: boolean = false;
  notificationMessage: string = '';
  notificationType: string = '';
  showNotification: boolean = false;

  constructor(private api: OtServiceService, private userService: UserService) {}

  private showTempNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    setTimeout(() => (this.showNotification = false), 1000);
  }

  ngOnInit(): void {
    const userType = this.userService.getIdTipoUsuario();
    this.isAdmin = userType === 2;
    this.loadAll();
  }

  loadAll(keepState: boolean = false) {
    const openState: any = {};
    if (keepState) {
      this.sections.forEach(s => (openState[s.key] = s.open));
    }
    forkJoin({
      edificios: this.api.getEdificio(''),
      pisos: this.api.getPiso(''),
      sectores: this.api.getSector(''),
      ubicaciones: this.api.getUbicacion(''),
      activos: this.api.getAT(''),
      usuarios: this.api.getUser(''),
      tareas: this.api.getTarea('')
    }).subscribe(data => {
      this.edificios = data.edificios.map((e: any) => ({ id: e.id, Nombre: e.Nombre }));
      this.pisos = data.pisos.map((p: any) => ({ id: p.id, Nombre: p.Nombre }));
      this.sectores = data.sectores.map((s: any) => ({ id: s.id, Nombre: s.Sector, IdEdificio: s.IdEdificio || 1 }));
      this.ubicaciones = data.ubicaciones.map((u: any) => ({ id: u.id, Nombre: u.Nombre }));
      this.activos = data.activos.map((a: any) => ({ id: a.id, Nombre: a.Nombre }));
      this.usuarios = data.usuarios.map((u: any) => ({ id: u.id, Nombre: u.nombre }));
      this.tareas = (data.tareas || []).map((t: any) => ({ id: t.id, Nombre: t.Descripcion }));
      this.sections = [
        {
          name: 'Edificios',
          data: this.edificios,
          key: 'edificio',
          open: keepState ? openState['edificio'] : false,
        },
        {
          name: 'Pisos',
          data: this.pisos,
          key: 'piso',
          open: keepState ? openState['piso'] : false,
        },
        {
          name: 'Sectores',
          data: this.sectores,
          key: 'sector',
          open: keepState ? openState['sector'] : false,
        },
        {
          name: 'Ubicaciones',
          data: this.ubicaciones,
          key: 'ubicacion',
          open: keepState ? openState['ubicacion'] : false,
        },
        {
          name: 'Activos',
          data: this.activos,
          key: 'activo',
          open: keepState ? openState['activo'] : false,
        },
        {
          name: 'Operarios',
          data: this.usuarios,
          key: 'usuario',
          open: keepState ? openState['usuario'] : false,
        },
        {
          name: 'Tareas',
          data: this.tareas,
          key: 'tarea',
          open: keepState ? openState['tarea'] : false,
        },
      ];
    });
  }

  add(model: any, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api
          .createEdificio({ id: Number(model.id), Nombre: model.Nombre, Direccion: '' })
          .subscribe(() => this.loadAll(true));
        break;
      case 'piso':
        this.api
          .createPiso({ id: Number(model.id), Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'sector':
        this.api
          .createSector({
            id: Number(model.id),
            Sector: model.Nombre,
            IdEdificio: 1,
          })
          .subscribe(() => this.loadAll(true));
        break;
      case 'ubicacion':
        this.api
          .createUbicacion({ id: Number(model.id), Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'activo':
        this.api
          .createActivo({ id: Number(model.id), Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'usuario':
        this.api
          .createUsuario({ name: model.Nombre, mail: '', password: '' })
          .subscribe(() => this.loadAll(true));
        break;
      case 'tarea':
        this.api
          .createTarea({ id: Number(model.id), descripcion: model.Nombre })
          .subscribe(() => {
            this.loadAll(true);
            this.showTempNotification('Tarea agregada.', 'success');
          });
        break;
    }
  }

  remove(id: number, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api.deleteEdificio(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'piso':
        this.api.deletePiso(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'sector':
        this.api.deleteSector(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'ubicacion':
        this.api.deleteUbicacion(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'activo':
        this.api.deleteActivo(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'usuario':
        this.api.deleteUsuario(Number(id)).subscribe(() => this.loadAll(true));
        break;
      case 'tarea':
        this.api.deleteTarea(Number(id)).subscribe(() => {
          this.loadAll(true);
          this.showTempNotification('Tarea eliminada.', 'success');
        });
        break;
    }
  }

  update(model: any, collection: string) {
    switch(collection) {
      case 'edificio':
        this.api
          .updateEdificio(Number(model.id), {
            Nombre: model.Nombre,
            Direccion: '',
          })
          .subscribe(() => this.loadAll(true));
        break;
      case 'piso':
        this.api
          .updatePiso(Number(model.id), { Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'sector':
        this.api
          .updateSector(Number(model.id), {
            Sector: model.Nombre,
            IdEdificio: model.IdEdificio || 1,
          })
          .subscribe(() => this.loadAll(true));
        break;
      case 'ubicacion':
        this.api
          .updateUbicacion(Number(model.id), { Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'activo':
        this.api
          .updateActivo(Number(model.id), { Nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'usuario':
        this.api
          .updateUsuario(Number(model.id), { nombre: model.Nombre })
          .subscribe(() => this.loadAll(true));
        break;
      case 'tarea':
        this.api
          .updateTarea(Number(model.id), { descripcion: model.Nombre })
          .subscribe(() => {
            this.loadAll(true);
            this.showTempNotification('Tarea actualizada.', 'success');
          });
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
