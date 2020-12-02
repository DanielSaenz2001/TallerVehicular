import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/TokenService';
import { ReparacionService } from 'src/app/servicios/ReparacionService';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-fase',
  templateUrl: './details-fase.component.html',
  styleUrls: ['./details-fase.component.css'],
  providers: [DatePipe]
})
export class DetailsFaseComponent implements OnInit {

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
    private route: ActivatedRoute,private datePipe: DatePipe,private formBuild: FormBuilder) { }

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
    console.log(this.DetallesForm.value)
    console.log(JSON.stringify(this.DetallesForm.value))
    this.reparacionService.createEtapa(this.DetallesForm.value,this.token.getAuth()).subscribe(
      data=>window.location.reload(),
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

}
