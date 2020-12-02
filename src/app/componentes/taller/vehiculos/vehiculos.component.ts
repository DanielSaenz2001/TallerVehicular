import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { VehiculosService } from 'src/app/servicios/VehiculosService';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  placa="";
  rol;
  public form={
    placa:' ',
  }
  listVehiculos;
  constructor(private vehiculosService: VehiculosService, private token:TokenService) { }

  ngOnInit(): void {
    this.ListVehiculos();
  }
  ListVehiculos(){
    this.vehiculosService.lista(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.listVehiculos=response;
    })
  }
  filtro(){
    this.form.placa=this.placa;
    this.vehiculosService.filtro(this.form,this.token.getAuth()).subscribe(response=>{
      this.listVehiculos=response;
    });
  }

}
