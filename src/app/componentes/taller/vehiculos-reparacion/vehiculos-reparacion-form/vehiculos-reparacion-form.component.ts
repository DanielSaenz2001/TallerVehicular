import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { ReparacionService } from 'src/app/servicios/ReparacionService';
import { ReportesService } from 'src/app/servicios/reportes.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-vehiculos-reparacion-form',
  templateUrl: './vehiculos-reparacion-form.component.html',
  styleUrls: ['./vehiculos-reparacion-form.component.css'],
  providers: [DatePipe]
})
export class VehiculosReparacionFormComponent implements OnInit {
  ListEtapas;
  presupuesto;
  public buscar={
    idVehiculoReparacionDetalle:null
  }
  public pre={
    idDetalles:null
  }

  EtapaForm: FormGroup;
  DetallesForm: FormGroup;
  ReparacionForm: FormGroup;
  etapas
  ID

  constructor(private reparacionService: ReparacionService, private token:TokenService,
    private route: ActivatedRoute,private datePipe: DatePipe,private formBuild: FormBuilder,
    private reportesService:ReportesService) { }

  ngOnInit(): void {
    this.lista()
  }
  VehiculoReparacion
  lista(){
    let id = this.route.snapshot.paramMap.get('id');
    this.ID=id
    this.ID= parseInt(this.ID)
    this.reparacionService.etapas(this.token.getAuth()).subscribe(response=>{
      this.etapas=response
      console.log(response)
    })
    this.EtapaForm = this.formBuild.group({
      idEtapas:  [''],
      nombre: ['', [Validators.required]]
    });
    this.DetallesForm = this.formBuild.group({
      idDetalles:  [null],
      fechaInicio: [null],
      fechaFin: [null],
      tiempoReparacion: [null],
      confirmarReparacion: [null],
      idEmpleadoDetalle: [null],
      idPropietarioDetalle: [null],
      idVehiculoReparacionDetalle:[null],
    });
    this.buscar.idVehiculoReparacionDetalle={
      idVehiculoReparacion:id
    }
    this.ReparacionForm = this.formBuild.group({
      idVehiculoReparacion:  [null],
      precioTotal: [null],
      fechaSalida: [null],
      fase: [null],
      idPropietarioFactura: [null],
      idVehiculoFactura: [null]
    });
    this.reparacionService.getById(this.ID,this.token.getAuth()).subscribe(data=>{
      this.VehiculoReparacion= data;
      console.log(data)
    })
    this.reparacionService.detalles(this.token.getAuth(),this.buscar).subscribe(response=>{
      console.log(response)
      this.ListEtapas=response
      if(this.ListEtapas[2] !== null){

        console.log(this.ListEtapas[2].idDetalles)
        this.formServicio.idDetalles={
          idDetalles:this.ListEtapas[2].idDetalles
        }
        this.reparacionService.servicioLista(this.formServicio, this.token.getAuth()).subscribe(response=>{
            this.ListServicio=response
            console.log(response)
            
            this.Suma=this.getSum('precioServicio');
          })
        }
    })
  }
  Suma
  getSum(index) : number {
    let sum = 0;
    for(let i = 0; i < this.ListServicio.length; i++) {
      sum += this.ListServicio[i][index];
    }
    console.log(sum)
    return sum;
  }

  getSum2(index) : number {
    let sum = 0;
    for(let i = 0; i < this.ListServicio.length; i++) {
      sum += this.ListServicio[i][index];
    }
    console.log(sum)
    return sum;
  }
  ListServicio

  public formServicio={
    idDetalles:null
  }
  public formRepuesto={
    idServicio:null
  }
  public error = null;
  public reporte={
    idReportes:null,
    descripcion:null,
    fecha:null,
    idEmpleadoReporte:null
  }
  crear(){
    this.DetallesForm.value.idEtapaReparacion={
      idEtapas:this.EtapaForm.value.idEtapas,
    }
    this.DetallesForm.value.idEmpleadoDetalle={
      idEmpleado:this.token.getID()
    }
    this.DetallesForm.value.idVehiculoReparacionDetalle= {
      idVehiculoReparacion:this.ID
    }
    this.myDate = new Date()
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.reporte.fecha=myDate;
    this.reporte.idEmpleadoReporte={
      idEmpleado: this.token.getID()
    }

    if(this.EtapaForm.value.idEtapas == 1){
      this.reporte.descripcion="Ha creado la etapa de registro de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 2){
      this.reporte.descripcion="Ha creado la etapa de inpeccion de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 3){
      this.reporte.descripcion="Ha creado la etapa de presupuesto de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 4){
      this.reporte.descripcion="Ha creado la etapa de autorizacion de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 5){
      this.reporte.descripcion="Ha creado la etapa de reparacion de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 6){
      this.reporte.descripcion="Ha creado la etapa de control de un vehiculo"
    }
    if(this.EtapaForm.value.idEtapas == 7){
      this.reporte.descripcion="Ha creado la etapa de entrega de un vehiculo"
    }
   
    this.reparacionService.createEtapa(this.DetallesForm.value,this.token.getAuth()).subscribe(
      data=>{
        this.reportesService.create(this.reporte, this.token.getAuth()).subscribe(
          data=>{console.log("se ha creado un reporte");window.location.reload()}
        )
        
      },
      error=>this.error=error.error.mensaje
    )
  }
  actualizarFase(id,etapa){
    console.log(id )
    
    this.myDate  = new Date();
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.DetallesForm.value.confirmarReparacion=true;
    this.DetallesForm.value.fechaFin=myDate;
    this.DetallesForm.value.idEmpleadoDetalle={
      idEmpleado:this.token.getID()
    };
    this.DetallesForm.value.idPropietarioDetalle={
      idPropietario:this.token.getID()
    };
    this.DetallesForm.value.idEtapaReparacion={
      idEtapas:etapa,
    }
    this.reparacionService.updateEtapa(id,this.DetallesForm.value,this.token.getAuth()).subscribe(
      response=>window.location.reload(),
      error=>console.log(error.error.mensaje)
    )
  }
  ocultar(){
    this.error=null
  }
  myDate
  autorizar(){
    this.myDate  = new Date();
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.DetallesForm.value.idEtapaReparacion={
      idEtapas:this.EtapaForm.value.idEtapas,
    }
    this.DetallesForm.value.idEmpleadoDetalle={
      idEmpleado:this.token.getID()
    }
    this.DetallesForm.value.idVehiculoReparacionDetalle= {
      idVehiculoReparacion:this.ID
    }
    this.DetallesForm.value.fechaInicio=myDate;
    this.reparacionService.createEtapa(this.DetallesForm.value,this.token.getAuth()).subscribe(
      data=>window.location.reload(),
      error=>this.error=error.error.mensaje
    )
  }
  entregar(){
    this.myDate = new Date()
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.ReparacionForm.value.fase="Culminado";
    this.ReparacionForm.value.precioTotal=this.Suma;
    this.ReparacionForm.value.idEmpleadoFactura={
      idEmpleado:this.token.getID()
    };
    this.ReparacionForm.value.idPropietarioFactura={
      idPropietario:this.ListEtapas[3].idPropietarioDetalle.idPropietario
    };
    this.ReparacionForm.value.fechaSalida=myDate;
    this.reparacionService.update(this.VehiculoReparacion.idVehiculoReparacion, this.ReparacionForm.value, this.token.getAuth()).subscribe(response=>{
      window.location.reload()
    })
  }
}
