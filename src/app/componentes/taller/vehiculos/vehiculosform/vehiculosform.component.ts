import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { JarwisService } from 'src/app/servicios/JarwisService';
import { UsuariosService } from 'src/app/servicios/UsuariosService';
import { TokenService } from 'src/app/servicios/TokenService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from 'src/app/servicios/VehiculosService';

@Component({
  selector: 'app-vehiculosform',
  templateUrl: './vehiculosform.component.html',
  styleUrls: ['./vehiculosform.component.css'],
  providers: [DatePipe]
})
export class VehiculosformComponent implements OnInit {

  constructor(private token: TokenService, private route: ActivatedRoute,
    private formBuild: FormBuilder, private vehiculosService: VehiculosService,
    private usuariosService:UsuariosService,private datePipe: DatePipe,private jarwis:JarwisService) { }
    ListVehiculo;
    tipo;
    responsable;
    tipoV;
    rolCA;
    vehiculos;
    public error = null;
    VehiculoForm: FormGroup;
    UsuarioCAForm:FormGroup;
    btnDisable;
    myDate
  ngOnInit(): void {
    this.jarwis.me(this.token.getAuth()).subscribe(responsable=>{
      console.log(responsable)
      this.responsable = responsable;
    })
    let id = this.route.snapshot.paramMap.get('id').toString();


      if(id == "crear"){
        console.log(id)
        this.tipo="crear";
      }else{
        this.vehiculosService.getById(id,this.token.getAuth()).subscribe(response=>{
          console.log(response)
          this.ListVehiculo=response;
          this.tipo="vista";
          this.VehiculoForm.setValue(response);
          this.vehiculosService.vehiculos(this.ListVehiculo.idVehiculo,this.token.getAuth()).subscribe(response=>{
            this.vehiculos=response
            console.log(response)
          })
          
        })
      }

      
  
      this.UsuarioCAForm = this.formBuild.group({
        idUsuario:  [{value: '',disabled: true}],
        nombreUsuario: [{value: '',disabled: true}],
        password: [{value: '',disabled: true}],
        imagenUser: [{value: '',disabled: true}],
        estadoContrato: [{value: '',disabled: true}],
        roles: [{value: '',disabled: true}],
        id:[{value: '',disabled: true}],
      });
      this.VehiculoForm = this.formBuild.group({
        idVehiculo:  [''],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required]],
        color: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        imagenVehiculo: [''],
        fechaCreacion: [{value: '',disabled: true}],
        fechaActualizacion: [{value: '',disabled: true}],
        usuarioCreacion: [''],
        usuarioActualizacion: [''],
      });
  }
  empleado;
  actualizar(){
    this.VehiculoForm.value.usuarioActualizacion={
      idEmpleado:this.token.getID()
    }
    this.myDate  = new Date();
    
    const myDate  = this.myDate.getFullYear() + "-"+this.myDate.getMonth() +"-"+(this.myDate.getDate()+1);
    this.VehiculoForm.value.fechaActualizacion=myDate

    console.log(this.VehiculoForm.value)

    this.vehiculosService.update(this.VehiculoForm.value.idVehiculo,
      this.VehiculoForm.value,this.token.getAuth()).subscribe(response=>location.reload())
  }

  crear(){
    this.myDate  = new Date();
    const myDate  = this.myDate.getFullYear() + "-"+this.myDate.getMonth() +"-"+(this.myDate.getDate()+1);

    this.VehiculoForm.value.fechaCreacion=this.myDate
    this.VehiculoForm.value.fechaActualizacion=this.myDate
    this.VehiculoForm.value.usuarioCreacion={
      idEmpleado:this.token.getID()
    }
    this.VehiculoForm.value.usuarioActualizacion={
      idEmpleado:this.token.getID()
    }

    console.log(this.VehiculoForm.value)
    this.vehiculosService.create(this.VehiculoForm.value,this.token.getAuth()).subscribe()
    
    
  }
  usuario(tipo){
    console.log(tipo)
    if(tipo == "actualizacion"){
      this.tipoV = "Actulizado";
      console.log(this.ListVehiculo.usuarioActualizacion)
      this.rolCA = this.ListVehiculo.usuarioActualizacion.roles[0].rolNombre
      this.UsuarioCAForm.setValue(this.ListVehiculo.usuarioActualizacion);
    }else{
      this.tipoV = "Creado ";
      console.log(this.ListVehiculo.usuarioCreacion)
      this.rolCA = this.ListVehiculo.usuarioCreacion.roles[0].rolNombre
      this.UsuarioCAForm.setValue(this.ListVehiculo.usuarioCreacion);
    }
  }
  cambiar(tipo){
    this.tipo=tipo;
  }
}
