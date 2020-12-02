import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { PropietarioService } from 'src/app/servicios/PropietarioService';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.css']
})
export class PropietariosComponent implements OnInit {
  cedula="";
  nombre="";

  rol;
  public form={
    cedula:' ',
    nombre:' ',
  }
  listPropietarios;
  constructor(private propietariosservice: PropietarioService, private token:TokenService) { }

  ngOnInit(): void {
    this.ListPropietarios();
  }
  ListPropietarios(){
    this.propietariosservice.lista(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.listPropietarios=response;
    })
  }
  filtro(){
    this.form.cedula=this.cedula;
    this.form.nombre=this.nombre;
    this.propietariosservice.PropietarioFiltro(this.form,this.token.getAuth()).subscribe(response=>{
      this.listPropietarios=response;
    });
  }
 
}
