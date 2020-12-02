import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { ReparacionService } from 'src/app/servicios/ReparacionService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculos-reparacion',
  templateUrl: './vehiculos-reparacion.component.html',
  styleUrls: ['./vehiculos-reparacion.component.css']
})
export class VehiculosReparacionComponent implements OnInit {

  constructor(private reparacionService: ReparacionService, private token:TokenService,
    private route: ActivatedRoute) { }
  ListVehiculos
  Vehiculos
  tipo;
  public error = null;
  public mensaje = null;
  public vehiculo={
    idVehiculoFactura:null,
    fase:"Proceso"
  }
  ID
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if(id=="registrar"){
      console.log("registrar auto")
      this.tipo="registrar"
      this.vehiculos()
    }else{
      console.log("ver lista")
      this.tipo="lista"  
      this.lista()
    }
  }
  lista(){
    this.reparacionService.lista(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.ListVehiculos=response
    })
  }
  vehiculos(){
    this.reparacionService.vehiculos(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.Vehiculos=response
    })
  }
  registrar(idVehiculoReparacion){
    console.log(idVehiculoReparacion)
    this.vehiculo.idVehiculoFactura={
      idVehiculo:idVehiculoReparacion
    }
    this.reparacionService.create(this.vehiculo,this.token.getAuth()).subscribe(
      data=>this.mensaje="Vehiculo Registrado a Reparacion",
      error=>this.error = error.error.mensaje
    )
  }
  ocultar(){
    this.error=null
  }
  ocultar2(){
    this.mensaje=null
  }
}
