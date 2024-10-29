import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { OtServicio } from '../../../../src/servicios/OT.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-orden-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './orden-trabajo.component.html',
  styleUrl: './orden-trabajo.component.css'
})
export class OrdenTrabajoComponent  {
  
 /* data: any[] = [];

  constructor(private apiService: OtServicio) {}

  ngOnInit(): void {
    this.llenarData()
  }

  llenarData(){
    this.apiService.getPiso('').subscribe(data => {
      this.data = data;
      console.log(this.data)
    })
  }
 */



  selectedEdificio: string = '';
  selectedSector: string = '';
  selectedPiso: string = '';
  selectedTipoActivo: string = '';
  selectedUbicacion: string = '';

  
  edificios = [
    { id: 1, nombre: 'Laprida 651' },
    { id: 2, nombre: 'Castelli 501' },
    { id: 3, nombre: 'Laprida 648' }
  ];

  
  sectores = [
    { id: 1, nombre: 'Administración' },
    { id: 2, nombre: 'Recursos Humanos' },
    { id: 3, nombre: 'IT' }
  ];

  
  pisos = [
    { id: 1, nombre: 'Planta Baja' },
    { id: 2, nombre: 'Primer Piso' },
    { id: 3, nombre: 'Segundo Piso' },
    { id: 4, nombre: 'Tercer Piso' },
    { id: 5, nombre: 'Terraza' }
  ];

  
  tiposActivo = [
    { id: 1, nombre: 'Computadora' },
    { id: 2, nombre: 'Impresora' },
    { id: 3, nombre: 'Luces' },
    { id: 4, nombre: 'Ventanas'},
    { id: 5, nombre: 'Persianas'},
    { id: 6, nombre: 'Puertas'}
    
  ];

  
  ubicaciones = [
    { id: 1, nombre: 'Interior' },
    { id: 2, nombre: 'Exterior con techo' },
    { id: 3, nombre: 'Exterior sin techo' }
  ];

  
  idsEdificiosARecorrer = [1, 3];
  idsSectoresARecorrer = [1,3];
  idsPisosARecorrer = [1, 5];
  idsTiposActivoARecorrer = [1, 6];
  idsUbicacionesARecorrer = [1, 3];
  activo: any;
  selectedOrdenTrabajoComponent: any;
  ubicacion: any;

 
  obtenerNombresEdificiosPorIds(): string[] {
    return this.edificios.filter(edificio => this.idsEdificiosARecorrer.includes(edificio.id)).map(edificio => edificio.nombre);
  }

  obtenerNombresSectoresPorIds(): string[] {
    return this.sectores.filter(sector => this.idsSectoresARecorrer.includes(sector.id)).map(sector => sector.nombre);
  }

  obtenerNombresPisosPorIds(): string[] {
    return this.pisos.filter(piso => this.idsPisosARecorrer.includes(piso.id)).map(piso => piso.nombre);
  }

  obtenerNombresTiposActivoPorIds(): string[] {
    return this.tiposActivo.filter(tipo => this.idsTiposActivoARecorrer.includes(tipo.id)).map(tipo => tipo.nombre);
  }

  obtenerNombresUbicacionesPorIds(): string[] {
    return this.ubicaciones.filter(ubicacion => this.idsUbicacionesARecorrer.includes(ubicacion.id)).map(ubicacion => ubicacion.nombre);
  }

  borrarSeleccion() {
    this.selectedEdificio = '';
    this.selectedSector = '';
    this.selectedPiso = '';
    this.selectedTipoActivo = '';
    this.selectedUbicacion = '';
  }

  
 imprimirPagina(){
      window.print()
  }


}

