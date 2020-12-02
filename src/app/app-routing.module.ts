import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/sistema/login/login.component';
import { HomeComponent } from './componentes/taller/home/home.component';
import { UsuariosComponent } from './componentes/taller/usuarios/usuarios.component';
import { UsuariosformComponent } from './componentes/taller/usuarios/usuariosform/usuariosform.component';
import { PropietariosComponent } from './componentes/taller/propietarios/propietarios.component';
import { PropietariosformComponent } from './componentes/taller/propietarios/propietariosform/propietariosform.component';
import { VehiculosComponent } from './componentes/taller/vehiculos/vehiculos.component';
import { VehiculosformComponent } from './componentes/taller/vehiculos/vehiculosform/vehiculosform.component';
import { VehiculosReparacionComponent } from './componentes/taller/vehiculos-reparacion/vehiculos-reparacion.component';
import { DetallesReparacionComponent } from './componentes/taller/detalles-reparacion/detalles-reparacion.component';
import { VehiculosReparacionFormComponent } from './componentes/taller/vehiculos-reparacion/vehiculos-reparacion-form/vehiculos-reparacion-form.component';
import { ServicioComponent } from './componentes/taller/vehiculos-reparacion/servicio/servicio.component';
import { DetailsFaseComponent } from './componentes/taller/detalles-reparacion/details-fase/details-fase.component';
import { DetailsServicioComponent } from './componentes/taller/detalles-reparacion/details-servicio/details-servicio.component';




//guards
import { AfterLoginGuard } from './guards/AfterLoginGuard';
import { BeforeLoginGuard } from './guards/BeforeLoginGuard';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [BeforeLoginGuard]},
  {path: 'home', component: HomeComponent,canActivate: [AfterLoginGuard]},
  {path: 'empleados', component: UsuariosComponent,canActivate: [AfterLoginGuard]},
  {path: 'empleados/:id', component: UsuariosformComponent,canActivate: [AfterLoginGuard]},
  {path: 'propietarios', component: PropietariosComponent,canActivate: [AfterLoginGuard]},
  {path: 'propietarios/:id', component: PropietariosformComponent,canActivate: [AfterLoginGuard]},
  {path: 'vehiculos', component: VehiculosComponent,canActivate: [AfterLoginGuard]},
  {path: 'vehiculos/:id', component: VehiculosformComponent,canActivate: [AfterLoginGuard]},
  {path: 'reparacion', component: VehiculosReparacionComponent,canActivate: [AfterLoginGuard]},
  {path: 'reparacion/:id', component: VehiculosReparacionComponent,canActivate: [AfterLoginGuard]},
  {path: 'reparacion/detalles/:id', component: VehiculosReparacionFormComponent,canActivate: [AfterLoginGuard]},
  {path: 'reparacion/detalles/servicio/:id', component: ServicioComponent,canActivate: [AfterLoginGuard]},
  {path: 'detalles/reparacion', component: DetallesReparacionComponent,canActivate: [AfterLoginGuard]},
  {path: 'detalles/reparacion/detalles/:id', component: DetailsFaseComponent,canActivate: [AfterLoginGuard]},
  {path: 'detalles/reparacion/detalles/servicio/:id', component: DetailsServicioComponent,canActivate: [AfterLoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
