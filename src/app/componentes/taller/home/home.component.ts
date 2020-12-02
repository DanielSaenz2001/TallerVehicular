import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/servicios/JarwisService';
import { TokenService } from 'src/app/servicios/TokenService';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/AuthService';
import { PropietarioService } from 'src/app/servicios/PropietarioService';
import { UsuariosService } from 'src/app/servicios/UsuariosService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/servicios/reportes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private token: TokenService, private jarwis:JarwisService,
    private Auth: AuthService,private router: Router,private propietarioService: PropietarioService,
    private empleadoService: UsuariosService,private formBuild: FormBuilder, private reportesService:ReportesService) { }
  datos;
  tipo;
  tipo2;
  PropietarioForm: FormGroup;
  RoleUserRolForm: FormGroup;
  UsuarioForm: FormGroup;
  ListEmpleadoForm: FormGroup;
  ListPropietario;
  Reportes;
  public reportesForm={
    idEmpleadoReporte:null
  }
  ngOnInit(): void {
    this.RoleUserRolForm = this.formBuild.group({
      id:  [{value: '',disabled: true}],
      rolNombre: [{value: '',disabled: true}]
    });
    this.UsuarioForm = this.formBuild.group({
      idUsuario:  [''],
      nombreUsuario: [{value: '',disabled: true}],
      password: [{value: '',disabled: true}],
      imagenUser: ['', [Validators.required]],
      estadoContrato: [{value: '',disabled: true}],
      roles: ['', [Validators.required]],
      id:[]
    });
    
    this.tipo2="vista";
    console.log(this.token.getAuth())
    console.log(this.token.getRole())
    console.log(this.token.getID())
    
    this.jarwis.me(this.token.getAuth()).subscribe(response=>{
      console.log(response)
      this.datos=response
      const rol = this.datos.roles[0].rolNombre
      if(rol == "ROLE_INVITADO"){
        
        this.PropietarioForm = this.formBuild.group({
          idPropietario:  [''],
          nombre: [{value: '',disabled: true}],
          apellidos: [{value: '',disabled: true}],
          cedula: [{value: '',disabled: true}],
          telefono: ['', [Validators.required]],
          email: [{value: '',disabled: true}],
          idUsuario: [''],
          fechaCreacion: [{value: '',disabled: true}],
          fechaActualizacion: [{value: '',disabled: true}],
          usuarioCreacion: [''],
          usuarioActualizacion: [''],
          password: [''],
        });
        this.propietarioService.getById(this.token.getID(), this.token.getAuth()).subscribe(response=>{
          this.tipo="INVITADO"
          this.ListPropietario= response
          console.log(response)
          this.rol= this.ListPropietario.idUsuario.roles[0]
          this.RoleUserRolForm.setValue(this.rol);
          this.UsuarioForm.setValue(response.idUsuario);
          this.PropietarioForm.setValue(response);
        })
      }else{
        this.reportesForm.idEmpleadoReporte={
          idEmpleado:this.token.getID()
        }

        this.reportesService.lista(this.reportesForm,this.token.getAuth()).subscribe(report=>{
          this.Reportes=report
          console.log("***************")
          console.log(report)
        })
        this.ListEmpleadoForm = this.formBuild.group({
          idEmpleado:  [''],
          nombre: [{value: '',disabled: true}],
          apellidos: [{value: '',disabled: true}],
          cedula: [{value: '',disabled: true}],
          telefono: ['', [Validators.required]],
          email: [{value: '',disabled: true}],
          idUsuario: ['']
        });
        this.empleadoService.getById(this.token.getID(), this.token.getAuth()).subscribe(response=>{
          this.tipo="NO_INVITADO"
          console.log(response)
          this.ListEmpleado= response
          console.log(response)
          this.rol= this.ListEmpleado.idUsuario.roles[0]
          this.RoleUserRolForm.setValue(this.rol);
          this.UsuarioForm.setValue(response.idUsuario);
          this.ListEmpleadoForm.setValue(response);
        })
      }
    })
  }
  ListEmpleado
  rol
  cambiar(tipo2){
    this.tipo2=tipo2;
  }
  actualizar(){
    if(this.tipo == "NO_INVITADO"){
      this.empleadoService.ActualizarEmpleado(this.token.getID(),this.ListEmpleadoForm.value,this.token.getAuth()).subscribe(response=>{
          this.empleadoService.UsuarioNoAdmin(this.datos.id, this.UsuarioForm.value,this.token.getAuth()).subscribe(
          response=>{
            location.reload();
          }
        )
      })
    }
    if(this.tipo == "INVITADO"){
      this.propietarioService.ActualizarInvitado(this.token.getID(),
        this.PropietarioForm.value,this.token.getAuth()).subscribe(response=>{
          this.empleadoService.UsuarioNoAdmin(this.datos.id, this.UsuarioForm.value,this.token.getAuth()).subscribe(
          response=>{
            location.reload();
          }
        )
      })
    }
  }
}
