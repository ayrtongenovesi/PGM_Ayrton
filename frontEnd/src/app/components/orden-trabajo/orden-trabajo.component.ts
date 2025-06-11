import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OtServiceService } from '../../../service/ot-service.service';
import { UserService } from '../../../service/services/user.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Piso } from '../../interfaces/piso';
import { Edificio } from '../../interfaces/edificio';
import { Usuario } from '../../interfaces/usuario';
import { Activo } from '../../interfaces/activo';
import { Ubicacion } from '../../interfaces/ubicacion';
import { Sector } from '../../interfaces/sector';
import { Tarea } from '../../interfaces/tarea';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrl: './orden-trabajo.component.css'
})

export class OrdenTrabajoComponent {
  minFecha: string = new Date().toISOString().split('T')[0];
  selectedFecha: string = '';
  selectedEdificio: string = '';
  selectedSector: string = '';
  selectedPiso: string = '';
  selectedTipoActivo: string = '';
  selectedUbicacion: string = '';
  selectedUsuario: string = '';
  selectedTareas: string = '';
  pdfUrl: string = ''; 
  notificationMessage: string = '';
  notificationType: string = '';
  showNotification: boolean = false;


  datosPiso: Piso[] = [];
  datosEdificio: Edificio [] = [];
  datosUsuario: Usuario [] = [];
  datosActivo: Activo [] = [];
  datosUbicacion: Ubicacion [] = [];
  datosSector: Sector [] = [];
  datosTareas: Tarea [] = [];

  constructor(private apiService: OtServiceService, private userService : UserService) {}
 
  private showTempNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 1000);
  }
  logout() {
    this.userService.logout();
    window.location.href = '/login';  
  }

  ngOnInit(): void {
    this.dataPiso()
    this.dataEdificio()
    this.dataUsuario()
    this.dataActivo()
    this.dataUbicacion()
    this.dataSector()
    this.dataTareas()
  }

  dataPiso(){
    this.apiService.getPiso('').subscribe(data => {
      this.datosPiso = (Array.isArray(data) ? data : [data]).map((p: any) => ({
        id_piso: p.Id,
        nombre: p.Nombre
      }));
      console.log(this.datosPiso);
    });
  }
  
  dataEdificio(){
    this.apiService.getEdificio('').subscribe(data => {
      this.datosEdificio = (Array.isArray(data) ? data : [data]).map((e: any) => ({
        id_edificio: e.Id,
        nombre: e.Nombre,
        direccion: e.Direccion
      }));
      console.log(this.datosEdificio);
    });
  }
  
  dataSector(){
    this.apiService.getSector('').subscribe(data => {
      this.datosSector = (Array.isArray(data) ? data : [data]).map((s: any) => ({
        id_sector: s.id ?? s.Id,
        nombre: s.Sector ?? s.nombre,
        id_edificio: s.IdEdificio ?? s.id_edificio
      }));
      console.log(this.datosSector);
    });
  }  
  
  dataUsuario(){
    this.apiService.getUser('').subscribe(data => {
      this.datosUsuario = (Array.isArray(data) ? data : [data]).map((u: any) => ({
        id_usuarios: u.id ?? u.Id,
        nombre: u.nombre,
        mail: u.mail,
        id_tipousuario: u.IdTipoUsuario ?? u.id_tipousuario,
        contraseña: u.contraseña
      }));
      console.log(this.datosUsuario);
    });
  }  
  
  dataActivo(){
    this.apiService.getAT('').subscribe(data => {
      this.datosActivo = (Array.isArray(data) ? data : [data]).map((a: any) => ({
        id_activo: a.Id,
        nombre: a.Nombre
      }));
      console.log(this.datosActivo);
    });
  }
  
  dataUbicacion(){
    this.apiService.getUbicacion('').subscribe(data => {
      this.datosUbicacion = (Array.isArray(data) ? data : [data]).map((u: any) => ({
        id_ubicacion: u.Id,
        nombre: u.Nombre
      }));
      console.log(this.datosUbicacion);
    });
  }
  
  dataTareas(){
    this.apiService.getTarea('').subscribe(data => {
      this.datosTareas = (Array.isArray(data) ? data : [data]).map((t: any) => ({
        id_tarea: t.Id,
        descripcion: t.Descripcion
      }));
      console.log(this.datosTareas);
    });
  }
  

  validarYGuardar(): void {
    if (!this.selectedEdificio || !this.selectedPiso || !this.selectedUbicacion || 
        !this.selectedSector || !this.selectedTipoActivo || !this.selectedUsuario || 
        !this.selectedTareas) {
          this.showTempNotification('Rellenar todos los datos.', 'error');
    } else {
      this.guardarEnOT();
      this.showTempNotification('Orden de trabajo guardada.', 'success');
    }
  }
  
  mostrarModal(mensaje: string): void {
   
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
   
    const message = document.createElement('p');
    message.innerText = mensaje;
    message.classList.add('mensajeModal');
    
    
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.classList.add('modal-close-button');
    closeButton.onclick = () => {
      
      document.body.removeChild(modal);
    };
    
    
    modalContent.appendChild(message);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    
    
    document.body.appendChild(modal);
  }

  @ViewChild('fechaInput') fechaInput!: ElementRef; 

  ngAfterViewInit() {
    this.fechaInput.nativeElement.addEventListener('change', (event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      this.selectedFecha = inputValue;
      const fechaSeleccionada = document.getElementById('fechaSeleccionada');
      const [año, mes, dia] = inputValue.split("-");
      const fechaFormateada = `${dia}/${mes}/${año}`;      
      fechaSeleccionada!.innerText = ' ' + fechaFormateada;      
    });
  }
  
  guardarEnOT() {
    const datosSeleccionados = {
      edificio: this.selectedEdificio,
      sector: this.selectedSector,
      piso: this.selectedPiso,
      tipoActivo: this.selectedTipoActivo,
      ubicacion: this.selectedUbicacion,
      usuario: this.selectedUsuario,
      tareas: this.selectedTareas,
      fecha: this.selectedFecha,
      disponible: 'Pendiente'
    };
    
    console.log("Datos a guardar:", datosSeleccionados);
  
    this.apiService.createOT(datosSeleccionados).subscribe({
      next: (response) => {
        console.log('Datos guardados en la tabla OT:', response);
      },
      error: (error) => {
        console.error('Error al guardar en la tabla OT:', error);
      },
      complete: () => {
        console.log('Operación completada');
        this.borradoForm();
      }
    });
  }
  
  borradoForm() {
    this.selectedEdificio = '';
    this.selectedSector = '';
    this.selectedPiso = '';
    this.selectedTipoActivo = '';
    this.selectedUbicacion = '';
    this.selectedUsuario = '';
    this.selectedTareas = '';
    this.pdfUrl = '';
  }

 imprimirPagina(){
      window.print()
  }; 
  
  generatePDF() {
    const DATA = document.getElementById('pdf-content'); 
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); 
        const pdf = new jsPDF('p', 'mm', 'a4'); 
      
        const imgWidth = 150;
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const x = (pageWidth - imgWidth) / 2;
      
        let heightLeft = imgHeight;
        let position = 20;
      
        pdf.addImage(imgData, 'PNG', x, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', x, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      
        const pdfBase64 = pdf.output('datauristring');
        this.pdfUrl = pdfBase64;
      
        pdf.save('ordenDeTrabajo.pdf');
      });      
    }
  }
}
