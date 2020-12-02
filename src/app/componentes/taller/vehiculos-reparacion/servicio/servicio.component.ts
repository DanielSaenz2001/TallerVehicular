import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ReparacionService } from 'src/app/servicios/ReparacionService';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/servicios/TokenService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/UsuariosService';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  public formServicio={
    idDetalles:null
  }
  public formRepuesto={
    idServicio:null
  }
  ID
  tipo
  constructor(private _location: Location,private reparacionService: ReparacionService,
    private route: ActivatedRoute,private token: TokenService,private formBuild: FormBuilder,
    private empleadoService: UsuariosService) { }


    public error = null;
    public mensaje = null;
    ServicioForm: FormGroup;
    RespuestoForm: FormGroup;
    ServicioRespuestoForm: FormGroup;
    ListServicio;

    ocultar(){
      this.error=null
    }
    ocultar2(){
      this.mensaje=null
    }
  ngOnInit(): void {
    this.servicio()
    this.tipo="vistaServicio"
    this.ServicioForm = this.formBuild.group({
      idServicio:  [''],
      descripcion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precioServicio: ['', [Validators.required]],
      habilitado: ['', [Validators.required]],
      descuentoServicio: ['', [Validators.required]],
      idDetalles: [''],
      idEmpleadoServicio: [''],
    });
    this.RespuestoForm = this.formBuild.group({
      idRespuesto:  [''],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
    this.ServicioRespuestoForm = this.formBuild.group({
      idServicioRepuesto:  [''],
      idServicio: [''],
      idRespuesto: [''],
      descuentoRespuesto: ['']
    });
  }
  empleadosLista
  Repuestos
  empleados(){
    this.empleadoService.usuarios(this.token.getAuth()).subscribe(
      response=>{this.empleadosLista= response; console.log(response)}
    )
  }
  regresar(){
    this._location.back();
  }
  servicio(){
    let id = this.route.snapshot.paramMap.get('id');
    this.ID=id
    this.formServicio.idDetalles={
      idDetalles:id
    }
    this.reparacionService.servicioLista(this.formServicio, this.token.getAuth()).subscribe(
      response=>{this.ListServicio=response; console.log(response)}, 
    )
  }
  ListDetalleServicio
  idServicio
  cambiar(tipo,id){
    this.tipo=tipo
    if(tipo == "agregarServicio" ){
      this.empleados()
    }
    if(tipo == "verServicio"){
      this.idServicio=id
      this.reparacionService.servicioDetalle(this.idServicio, this.token.getAuth()).subscribe(
        response=>{console.log(response); this.ListDetalleServicio=response}, 
        
      )
      this.formRepuesto.idServicio={
        idServicio: this.idServicio
      }
      this.reparacionService.servicioRepuestos(this.formRepuesto, this.token.getAuth()).subscribe(
        response=>{console.log(response), this.Repuestos=response}
      )
    }
    if(tipo == "actualizarServicio"){
      this.reparacionService.servicioDetalle(id, this.token.getAuth()).subscribe(
        response=>{this.ServicioForm.setValue(response)}, 
      )
      this.empleados()
    }
    if(tipo=="ListaRepuesto"){
      this.reparacionService.Listarespuestos(this.token.getAuth()).subscribe(response=>{
        this.respuestosLista=response
        console.log(response)
      })
    }
  }
  respuestosLista
  registrarServicio(){
    this.ServicioForm.value.idDetalles={
      idDetalles:this.ID
    }
    this.reparacionService.servicioCrear(this.ServicioForm.value,this.token.getAuth()).subscribe(
      response=>window.location.reload(),
      error=>this.error=error.error.mensaje
    )
  }
  actualizarServicio(){
    this.reparacionService.servicioActualizar(this.ServicioForm.value.idServicio,this.ServicioForm.value,this.token.getAuth()).subscribe(
      response=>window.location.reload(),
      error=>this.error=error.error.mensaje
    )
  }
  eliminarRepuesto(id){
    this.reparacionService.servicioRepuestosEliminar(id,this.token.getAuth()).subscribe(response=>{
      this.reparacionService.servicioRepuestos(this.formRepuesto, this.token.getAuth()).subscribe(
        response=>{this.Repuestos=response}
      )
      })
  }
  crearRepuesto(){
    this.reparacionService.crearRepuesto(this.RespuestoForm.value, this.token.getAuth()).subscribe(response=>{
      this.reparacionService.Listarespuestos(this.token.getAuth()).subscribe(response=>{
        this.respuestosLista=response
      })
    })
  }
  agregarServicioRespuesto(idRespuesto){
    this.ServicioRespuestoForm.value.idServicio={
      idServicio:this.idServicio
    }
    this.ServicioRespuestoForm.value.idRespuesto={
      idRespuesto:idRespuesto
    }
    this.ServicioRespuestoForm.value.descuentoRespuesto=0
    this.reparacionService.crearservicioRepuestos(this.ServicioRespuestoForm.value, this.token.getAuth()).subscribe(
      response=>{
          this.tipo="verServicio"
          this.reparacionService.servicioDetalle(this.idServicio, this.token.getAuth()).subscribe(
            response=>{console.log(response); this.ListDetalleServicio=response}, 
            
          )
          this.formRepuesto.idServicio={
            idServicio: this.idServicio
          }
          this.reparacionService.servicioRepuestos(this.formRepuesto, this.token.getAuth()).subscribe(
            response=>{console.log(response), this.Repuestos=response}
          )
      }
    )
  }
}
