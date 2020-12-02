import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/sistema/login/login.component';
import { HomeComponent } from './componentes/taller/home/home.component';
import { NavbarComponent } from './componentes/sistema/navbar/navbar.component';
import { UsuariosComponent } from './componentes/taller/usuarios/usuarios.component';
import { PropietariosComponent } from './componentes/taller/propietarios/propietarios.component';
import { SidebarComponent } from './componentes/sistema/sidebar/sidebar.component';
import { UsuariosformComponent } from './componentes/taller/usuarios/usuariosform/usuariosform.component';
import { PropietariosformComponent } from './componentes/taller/propietarios/propietariosform/propietariosform.component';
import { VehiculosComponent } from './componentes/taller/vehiculos/vehiculos.component';
import { VehiculosformComponent } from './componentes/taller/vehiculos/vehiculosform/vehiculosform.component';
import { VehiculosReparacionComponent } from './componentes/taller/vehiculos-reparacion/vehiculos-reparacion.component';
import { DetallesReparacionComponent } from './componentes/taller/detalles-reparacion/detalles-reparacion.component';
import { VehiculosReparacionFormComponent } from './componentes/taller/vehiculos-reparacion/vehiculos-reparacion-form/vehiculos-reparacion-form.component';
import { ServicioComponent } from './componentes/taller/vehiculos-reparacion/servicio/servicio.component';
import { DetailsFaseComponent } from './componentes/taller/detalles-reparacion/details-fase/details-fase.component';
import { DetailsServicioComponent } from './componentes/taller/detalles-reparacion/details-servicio/details-servicio.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    UsuariosComponent,
    PropietariosComponent,
    SidebarComponent,
    UsuariosformComponent,
    PropietariosformComponent,
    VehiculosComponent,
    VehiculosformComponent,
    VehiculosReparacionComponent,
    DetallesReparacionComponent,
    VehiculosReparacionFormComponent,
    ServicioComponent,
    DetailsFaseComponent,
    DetailsServicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
