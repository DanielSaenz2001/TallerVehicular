import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/UsuariosService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'src/app/servicios/TokenService';

@Component({
  selector: 'app-usuariosform',
  templateUrl: './usuariosform.component.html',
  styleUrls: ['./usuariosform.component.css']
})
export class UsuariosformComponent implements OnInit {

  constructor(private token: TokenService, private route: ActivatedRoute,
    private formBuild: FormBuilder, private UsuariosService: UsuariosService) { }


    ListUsuario;
    ListRoles;
    rol;
    tipo;
    public error = null;
    RoleUserRolForm: FormGroup;
    UsuarioForm: FormGroup;
    empleadoForm:FormGroup;
    btnDisable;
    public roles={
      id:1,
      rolNombre:"ROLE_TECNICOS_TALLER"
    }
    ngOnInit(): void {
      this.btnDisable=false
      let id = this.route.snapshot.paramMap.get('id').toString();
      this.RoleUserRolForm = this.formBuild.group({
        id:  [''],
        rolNombre: ['', [Validators.required]]
      });


      if(id == "crear"){
        console.log(id)
        this.tipo="crear";
        console.log(this.roles)
        this.RoleUserRolForm.setValue(this.roles);
      }else{
        this.UsuariosService.getById(id,this.token.getAuth()).subscribe(response=>{
          this.ListUsuario=response;
          this.tipo="vista";
          console.log(this.ListUsuario)
          this.rol= this.ListUsuario.idUsuario.roles[0]
          console.log(this.rol)
          this.RoleUserRolForm.setValue(this.rol);
          this.UsuarioForm.setValue(response.idUsuario);
          this.empleadoForm.setValue(response);
        })
      }

      
  
      this.UsuarioForm = this.formBuild.group({
        idUsuario:  [''],
        nombreUsuario: ['', [Validators.required]],
        password: ['', [Validators.required]],
        imagenUser: ['', [Validators.required]],
        estadoContrato: ['', [Validators.required]],
        roles: ['', [Validators.required]],
        id:[]
      });
      this.empleadoForm = this.formBuild.group({
        idEmpleado:  [''],
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required]],
        idUsuario: [''],
      });
      this.UsuariosService.roles(this.token.getAuth()).subscribe(
        response=>{
          this.ListRoles=response;
          console.log(response)
        },
        error=>{
          this.error = error.error.error;
          console.log(this.error)
        }
        )
    }
   
    usuario;
    actualizar(){
      this.UsuarioForm.value.roles[0].id=this.RoleUserRolForm.value.id
      console.log(this.UsuarioForm.value.id)
      this.empleadoForm.value.idUsuario={
        idUsuario:this.ListUsuario.idUsuario.id
      }
      
      console.log(this.UsuarioForm.value)
      this.UsuariosService.actualizarEmpleado(this.empleadoForm.value.idEmpleado,this.empleadoForm.value,this.token.getAuth()).subscribe(response=>{
        this.UsuariosService.actualizarUsuario(this.UsuarioForm.value.id, this.UsuarioForm.value,this.token.getAuth()).subscribe(response=>{
          location.reload();
        })
      })
    }
    ocultar(){
      this.error=null
    }
    crear(){
      this.UsuarioForm.value.roles=[
        this.RoleUserRolForm.value.rolNombre
      ]
      console.log(this.UsuarioForm.value)
      this.UsuariosService.createusuarios(this.UsuarioForm.value,this.token.getAuth()).subscribe(response=>{
        this.usuario = response
        this.empleadoForm.value.idUsuario={
          idUsuario:this.usuario.idUsuario
        }
        console.log(this.empleadoForm.value)
        this.UsuariosService.createEmpleado(this.empleadoForm.value,this.token.getAuth()).subscribe()
       
      },
      error=>this.error = error.error.mensaje)
    }
    cambiar(tipo){
      this.tipo=tipo;
    }
}
