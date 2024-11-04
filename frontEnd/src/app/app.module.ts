import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntornoComponent } from './components/entorno/entorno.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { OrdenVisualComponent } from './components/orden-visual/orden-visual.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HttpClientModule } from '@angular/common/http';
import { ProtectedComponent } from './components/ProtectedComponent';

@NgModule({
  declarations: [
    AppComponent,
    EntornoComponent,
    LoginComponent,
    OrdenTrabajoComponent,
    OrdenVisualComponent,
    HistorialComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
