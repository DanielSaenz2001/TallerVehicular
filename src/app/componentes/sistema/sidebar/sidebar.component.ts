import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/servicios/AuthService';
import { JarwisService } from 'src/app/servicios/JarwisService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  validado=true
  list;
  ListImagen;
  ListPersona;
  rol;
  estado;
  componente
  constructor(private Auth: AuthService,private router: Router,
    private Token: TokenService,private _location: Location, private Jarwis:JarwisService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.listar();
    this.componente= this.route
    console.log(this.componente.component.name);
  }
  listar(){
    this.Jarwis.me(this.Token.getAuth()).subscribe(
      data => this.handleResponse(data),
      error => this.handleError()
    );
  }
  handleResponse(data) {
    this.rol = data.roles[0].rolNombre
    this.rol = this.rol.replace('ROLE_','')
    this.rol = this.rol.replace('_',' ')
    this.estado=data.estadoContrato;
  }
  back(){
    this._location.back();
  }
  handleError() {
    this.Token.removeAuth();
    this.Token.removeRole();
    this.Token.removeID();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/');
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.removeAuth();
    this.Token.removeID();
    this.Token.removeRole();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }
  salir(){
    var r = confirm("desea salir del programa ?")
    if (r == true) {
      this.Token.removeAuth();
      this.Token.removeRole();
      this.Token.removeID();
      this.Auth.changeAuthStatus(false);
      this.router.navigateByUrl('');
    } 
  }

}
