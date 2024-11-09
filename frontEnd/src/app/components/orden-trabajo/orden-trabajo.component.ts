import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OtServiceService } from '../../../service/ot-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



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
  selectedUsuario: string = '';
  selectedTareas: string = '';
  pdfUrl: string = '';

  data: any[] = [];
  datosPiso: any[] = [];
  datosEdificio: any[] = [];
  datosUsuario: any[] = [];
  datosActivo: any[] = [];
  datosUbicacion: any[] = [];
  datosSector: any[] = [];
  datosTareas: any[] = [];

  constructor(private apiService: OtServiceService) {}

  ngOnInit(): void {
    this.dataPiso()
    this.dataEdificio()
    /*this.dataSector()*/
    this.dataUsuario()
    this.dataActivo()
    this.dataUbicacion()
    this.dataSector()
    this.dataTareas()
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

  dataSector(){
    this.apiService.getSector('').subscribe(data => {
      this.datosSector = data;
      console.log(this.datosSector)
    })
  }

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

  dataTareas(){
    this.apiService.getTarea('').subscribe(data => {
      this.datosTareas = data;
      console.log(this.datosTareas)
    })
  }

  guardarEnOT() {
    const datosSeleccionados = {
      edificio: this.selectedEdificio,
      sector: this.selectedSector,
      piso: this.selectedPiso,
      tipoActivo: this.selectedTipoActivo,
      ubicacion: this.selectedUbicacion,
      /*usuario: this.selectedUsuario,*/
      tareas: this.selectedTareas
    };
    console.log (this.guardarEnOT);
    console.log (datosSeleccionados);
    

    this.apiService.createOT(datosSeleccionados).subscribe({
      next: (response) => {
        console.log('Datos guardados en la tabla OT:', response);
      },
      error: (error) => {
        console.error('Error al guardar en la tabla OT:', error);
      },
      complete: () => {
        console.log('Operación completada');
      }
    });
  };

  
 imprimirPagina(){
      window.print()
  }; 

  @ViewChild('fechaInput') fechaInput!: ElementRef; 

  ngAfterViewInit() {
    this.fechaInput.nativeElement.addEventListener('change', (event: Event) => {
      const fechaSeleccionada = document.getElementById('fechaSeleccionada');
      const inputValue = (event.target as HTMLInputElement).value; 
      fechaSeleccionada!.innerText = "Fecha seleccionada: " + inputValue;
    });

  }
  
  generatePDF() {
    const DATA = document.getElementById('pdf-content'); 
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); 
        const pdf = new jsPDF('p', 'mm', 'a4'); 

        
        const imgWidth = 150; 
        const pageHeight = pdf.internal.pageSize.height; 
        const imgHeight = canvas.height * imgWidth / canvas.width; // Escalar la imagen
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; 

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight; 
        }
         
        const pdfBase64 = pdf.output('datauristring');

        this.pdfUrl = pdfBase64;

        pdf.save('documento-angular.pdf');
      });
    }
  }
  
}
