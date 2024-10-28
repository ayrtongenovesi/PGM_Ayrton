import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { AppComponent } from '../../app.component';
import { OrdenTrabajoComponent } from './orden-trabajo.component';  // Tu componente

@NgModule({
    imports: [
      CommonModule,
      OrdenTrabajoComponent,
      AppComponent  // Importa el componente standalone, no lo declares
    ]
  })
  export class OrdenTrabajoModule { }