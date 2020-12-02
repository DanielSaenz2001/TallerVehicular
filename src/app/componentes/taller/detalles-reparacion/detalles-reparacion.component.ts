import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { ReparacionService } from 'src/app/servicios/ReparacionService';
import { ActivatedRoute } from '@angular/router';
import { PropietarioService } from 'src/app/servicios/PropietarioService';

@Component({
  selector: 'app-detalles-reparacion',
  templateUrl: './detalles-reparacion.component.html',
  styleUrls: ['./detalles-reparacion.component.css']
})
export class DetallesReparacionComponent implements OnInit {

  constructor(private reparacionService: ReparacionService, private token:TokenService,
    private route: ActivatedRoute,private propietarioService: PropietarioService) { }
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
    this.lista()
  }
  vehiculos
  lista(){
    this.reparacionService.lista(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.ListVehiculos=response
    })
    this.propietarioService.vehiculos(this.token.getID(),this.token.getAuth()).subscribe(response=>{
      this.vehiculos=response
      console.log("VEHICULOS : ")
      console.log(response)
    })
  }
  
}
