import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';  // Importa el componente standalone
import { FormsModule } from '@angular/forms';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { AppRoutingModule } from './app.routes';



@NgModule({
  
  imports: [
    FormsModule,
    BrowserModule,
    AppComponent,
    AppRoutingModule,
    OrdenTrabajoComponent,
    HttpClientModule  // Importa el componente standalone
  ],
  
  providers: [],
   // El componente raíz sigue siendo el AppComponent
})
export class AppModule { }