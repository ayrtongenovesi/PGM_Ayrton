import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EntornoComponent } from './components/entorno/entorno.component';
import { NgModule } from '@angular/core';
import { OrdenTrabajoComponent } from './components/orden-trabajo/orden-trabajo.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inicio', 
    component: EntornoComponent
  },
  {
    path: 'ot', 
    component: OrdenTrabajoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }                         