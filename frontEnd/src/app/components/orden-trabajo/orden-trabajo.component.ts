import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OtServiceService } from '../../../service/ot-service.service';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrl: './orden-trabajo.component.css'
})
export class OrdenTrabajoComponent {


  selectedEdificio: string = '';
  selectedSector: string = '';
  selectedPiso: string = '';
  selectedTipoActivo: string = '';
  selectedUbicacion: string = '';

  data: any[] = [];
  datosPiso: any[] = [];
  datosEdificio: any[] = [];
  datosUsuario: any[] = [];
  datosActivo: any[] = [];
  datosUbicacion: any[] = [];

  constructor(private apiService: OtServiceService) {}

  ngOnInit(): void {
    this.dataPiso()
    this.dataEdificio()
    /*this.dataSector()*/
    this.dataUsuario()
    this.dataActivo()
    this.dataUbicacion()
  }

  dataPiso(){
    this.apiService.getPiso('').subscribe(data => {
      this.datosPiso = data;
      console.log(this.datosPiso)
    })
  }

  dataEdificio(){
    this.apiService.getEdificio('').subscribe(data => {
      this.datosEdificio = data;
      console.log(this.datosEdificio)
    })
  }

 /* dataSector(){
    this.apiService.getSector('').subscribe(data => {
      this.data = data;
      console.log(this.data)
    })
  }*/

  dataUsuario(){
    this.apiService.getUser('').subscribe(data => {
      this.datosUsuario = data;
      console.log(this.datosUsuario)
    })
  }
 
  dataActivo(){
    this.apiService.getAT('').subscribe(data => {
      this.datosActivo = data;
      console.log(this.datosActivo)
    })
  }

  dataUbicacion(){
    this.apiService.getUbicacion('').subscribe(data => {
      this.datosUbicacion = data;
      console.log(this.datosUbicacion)
    })
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
