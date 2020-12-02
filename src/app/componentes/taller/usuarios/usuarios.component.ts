import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { UsuariosService } from 'src/app/servicios/UsuariosService';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  cedula="";
  nombre="";

  rol;
  public form={
    cedula:' ',
    nombre:' ',
  }
  Listusuarios;
  constructor(private UsuariosService: UsuariosService, private token:TokenService) { }

  ngOnInit(): void {
    this.ListUsuarios();
  }
  ListUsuarios(){
    this.UsuariosService.usuarios(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.Listusuarios=response;
    })
  }
  filtro(){
    this.form.nombre=this.nombre;
    this.form.cedula=this.cedula;
    this.UsuariosService.usuariosFiltro(this.form,this.token.getAuth()).subscribe(response=>{
      this.Listusuarios=response;
    })
  }

}
