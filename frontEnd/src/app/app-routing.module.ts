import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { EntornoComponent } from './components/entorno/entorno.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenVisualComponent } from './components/orden-visual/orden-visual.component';
import { HistorialComponent } from './components/historial/historial.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { LoginGuard } from '../service/guards/login.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ot',
    component: OrdenTrabajoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'visual',
    component: OrdenVisualComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gestion',
    component: GestionComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
