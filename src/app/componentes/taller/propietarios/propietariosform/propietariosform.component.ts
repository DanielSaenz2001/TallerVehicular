import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropietarioService } from 'src/app/servicios/PropietarioService';
import { TokenService } from 'src/app/servicios/TokenService';
import { UsuariosService } from 'src/app/servicios/UsuariosService';
import { DatePipe } from '@angular/common';
import { JarwisService } from 'src/app/servicios/JarwisService';
import { VehiculosService } from 'src/app/servicios/VehiculosService';

@Component({
  selector: 'app-propietariosform',
  templateUrl: './propietariosform.component.html',
  styleUrls: ['./propietariosform.component.css'],
  providers: [DatePipe]
})
export class PropietariosformComponent implements OnInit {

  constructor(private token: TokenService, private route: ActivatedRoute,
    private formBuild: FormBuilder, private propietarioService: PropietarioService,
    private usuariosService:UsuariosService,private datePipe: DatePipe,private jarwis:JarwisService,
    private vehiculosService: VehiculosService,private Jarwis:JarwisService) { }


    ListPropietario;
    ListRoles;
    rol;
    tipo;responsable;
    public error = null;
    public mensaje = null;
    RoleUserRolForm: FormGroup;
    PropietarioForm: FormGroup;
    UsuarioCAForm:FormGroup;
    VehiculosPropietariosForm:FormGroup;
    UsuarioForm:FormGroup;
    btnDisable;
    public roles={
      id:8,
      rolNombre:"ROLE_INVITADO"
    }
    public login = {
      nombreUsuario: null,
      password: null
    };
    public email = {
      email: null,
      content: null,
      subject:null
    };
    myDate
  ngOnInit(): void {
    this.jarwis.me(this.token.getAuth()).subscribe(responsable=>{
      console.log(responsable)
      this.responsable = responsable;
    })

    let id = this.route.snapshot.paramMap.get('id').toString();
      this.RoleUserRolForm = this.formBuild.group({
        id:  [''],
        rolNombre: ['', [Validators.required]]
      });


      if(id == "crear"){
        console.log(id)
        this.tipo="crear";
        this.RoleUserRolForm.setValue(this.roles);
      }else{
        this.propietarioService.getById(id,this.token.getAuth()).subscribe(response=>{
          console.log(response)
          this.ListPropietario=response;
          this.tipo="vista";
          this.rol= this.ListPropietario.idUsuario.roles[0]
          this.RoleUserRolForm.setValue(this.rol);
          this.UsuarioForm.setValue(response.idUsuario);
          this.PropietarioForm.setValue(response);
        })
      }

      
  
      this.UsuarioCAForm = this.formBuild.group({
        idEmpleado:  [{value: '',disabled: true}],
        nombre: [{value: '',disabled: true}],
        email: [{value: '',disabled: true}],
        cedula: [{value: '',disabled: true}],
        apellidos: [{value: '',disabled: true}],
        telefono: [{value: '',disabled: true}],
        idUsuario:[{value: '',disabled: true}],
      });
      this.UsuarioForm = this.formBuild.group({
        idUsuario:  [''],
        nombreUsuario: ['', [Validators.required]],
        password: ['', [Validators.required]],
        imagenUser: ['', [Validators.required]],
        estadoContrato: ['', [Validators.required]],
        roles: ['', [Validators.required]],
        id:[]
      });
      this.PropietarioForm = this.formBuild.group({
        idPropietario:  [''],
        nombre: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        email: ['', [Validators.required]],
        idUsuario: [''],
        fechaCreacion: [{value: '',disabled: true}],
        fechaActualizacion: [{value: '',disabled: true}],
        usuarioCreacion: [''],
        usuarioActualizacion: [''],
        password: [''],
      });
      this.VehiculosPropietariosForm = this.formBuild.group({
        idPropietarioVehiculo:  [''],
        idPropietario : [''],
        idVehiculo : [''],
      });
      this.usuariosService.roles(this.token.getAuth()).subscribe(response=>{
          this.ListRoles=response;
        },
        error=>{
          this.error = error.error.error;
          console.log(this.error)
        }
      )
  }
  empleado;
  actualizar(){
    this.UsuarioForm.value.roles[0].id=this.RoleUserRolForm.value.id
    console.log(this.UsuarioForm.value.id)
    this.PropietarioForm.value.idUsuario={
      idUsuario:this.ListPropietario.idUsuario.id
    }
    this.PropietarioForm.value.usuarioActualizacion={
      idEmpleado:this.token.getID()
    }
    this.myDate  = new Date();
    
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    
    this.PropietarioForm.value.fechaActualizacion=myDate

    console.log(this.PropietarioForm.value.fechaActualizacion)

    this.propietarioService.actualizarPropietario(this.PropietarioForm.value.idPropietario,
      this.PropietarioForm.value,this.token.getAuth()).subscribe(response=>{
        this.propietarioService.actualizarUsuario(this.UsuarioForm.value.id, this.UsuarioForm.value,this.token.getAuth()).subscribe(
          response=>{location.reload();}
        )
      })
  }
  crear(){
    this.myDate  = new Date();
    const myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.UsuarioForm.value.roles=[
      this.RoleUserRolForm.value.rolNombre
    ]

    this.PropietarioForm.value.fechaCreacion=myDate
    this.PropietarioForm.value.fechaActualizacion=myDate
    this.PropietarioForm.value.password=this.UsuarioForm.value.password
    

    console.log(this.UsuarioForm.value)
    //console.log(this.PropietarioForm.value)
    this.PropietarioForm.value.usuarioCreacion={
      idEmpleado:this.token.getID()
    }
    this.PropietarioForm.value.usuarioActualizacion={
      idEmpleado:this.token.getID()
    }
    console.log(this.PropietarioForm.value)
    this.propietarioService.createusuarios(this.UsuarioForm.value,this.token.getAuth()).subscribe(response=>{
      this.empleado = response
      this.PropietarioForm.value.idUsuario={
        idUsuario:this.empleado.idUsuario
      }
      console.log(this.PropietarioForm.value)
      this.propietarioService.createPropietario(this.PropietarioForm.value,this.token.getAuth()).subscribe()
     
    },
    error=>{
      this.error = error.error.mensaje
    })
  }
  context=""
  rolCA;
  tipoV;
  usuario(tipo){
    console.log(tipo)
    if(tipo == "actualizacion"){
      this.tipoV = "Actualizado";
      console.log(this.ListPropietario.usuarioActualizacion)
      this.rolCA = this.ListPropietario.usuarioActualizacion.idUsuario.roles[0].rolNombre
      this.UsuarioCAForm.setValue(this.ListPropietario.usuarioActualizacion);
    }else{
      this.tipoV = "Creado ";
      console.log(this.ListPropietario.usuarioCreacion)
      this.rolCA = this.ListPropietario.usuarioCreacion.idUsuario.roles[0].rolNombre
      this.UsuarioCAForm.setValue(this.ListPropietario.usuarioCreacion);
    }
  }
  vehiculos=null
  ListVehiculos=null
  cambiar(tipo){
    this.tipo=tipo;
    if(tipo =="vehiculos"){
      console.log("asdas")
      this.propietarioService.vehiculos(this.ListPropietario.idPropietario,this.token.getAuth()).subscribe(response=>{
        this.vehiculos=response
        console.log(response)
      })
    }
    if(tipo =="agregar"){
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.vehiculosService.lista(this.token.getAuth()).subscribe(response=>{
        this.ListVehiculos=response
        console.log(response)
      })
    }
  } 
  res
  enviarEmail(){
    var r=confirm("¿Esta seguro que quiere mandar un token de autorización a este usuario?");
    if (r==true){
      this.login.nombreUsuario=this.ListPropietario.idUsuario.nombreUsuario;
      this.login.password=this.ListPropietario.password;
      this.Jarwis.login(this.login).subscribe(data=>{
        this.res = data
        const fecha  = new Date();
        const fechaIni = this.datePipe.transform(fecha.getTime(), 'h:mm:ss a');
        const fechaFin = this.datePipe.transform(fecha.getTime()+28800000, 'h:mm:ss a');
        this.context="Buen dia señor <b>" +this.ListPropietario.nombre+ " " + this.ListPropietario.apellidos+"</b>, identificado con la cedula a <b>" + this.ListPropietario.cedula+ "</b> <br> <br> El Taller de Vehiculos les da el acceso al sistema como invitado las proximas 8 horas desde "+fechaIni +" hasta las " +fechaFin +"<br> Este es su Token de acceso:<br> <b>Bearer " + this.res.token +"</b><br> <a href='http://localhost:4200/'>Entrar a Taller Vehicular</a>"
        this.email.content=this.context;
        this.email.email=this.ListPropietario.email;
        this.email.subject="Taller Vehicular Token"
        this.propietarioService.PropietarioEmail(this.email,this.token.getAuth()).subscribe()
      })
    }else{
        
    }
  }
  filtro(){
    this.form.placa=this.placa;
    this.vehiculosService.filtro(this.form,this.token.getAuth()).subscribe(response=>{
      this.ListVehiculos=response;
    });
  }
  placa="";
  public form={
    placa:' ',
  }
  agregar(id_vehiculo){
    let id = this.route.snapshot.paramMap.get('id').toString();
    this.VehiculosPropietariosForm.value.idPropietario ={
      idPropietario:id
    };
    this.VehiculosPropietariosForm.value.idVehiculo ={
      idVehiculo:id_vehiculo
    }
    this.propietarioService.agregarvehiculos(this.VehiculosPropietariosForm.value,this.token.getAuth()).subscribe(
      data=>this.mensaje="Vehiculo vinculado al propietario",
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
