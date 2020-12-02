import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/servicios/JarwisService';
import { TokenService } from 'src/app/servicios/TokenService';
import { AuthService } from 'src/app/servicios/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token ;
  public form = {
    nombreUsuario: null,
    password: null,
  };
  user;
  empleado;
  public error = null;
  tipo;
  constructor(private Jarwis: JarwisService,private Token: TokenService,
    private router: Router,private Auth: AuthService,private route: ActivatedRoute
  ) { }
  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
      
    );
  }
  handleResponse(data) {
    console.log(data)
    this.Jarwis.me(data.token).subscribe(token=>{
      this.user=token
      this.Jarwis.empleado(data.token,this.user.id).subscribe(response=>{
        this.empleado=response
        this.Token.handleAuth(data.token);
        this.Token.handleRole(data.authorities[0].authority);
        this.Token.handleID(this.empleado.idEmpleado)
        this.Auth.changeAuthStatus(true);
        this.router.navigateByUrl('/home');
      },
      error=>{
        this.error = error.error.mensaje;
      })
    })
    /*this.Jarwis.empleado(data.token,this.datos.id).subscribe(response=>{
      console.log(response)
      
      //this.token.setID()
    })*/
    
  }
  ocultar(){
    this.error=null
  }
  handleError(error) {
    console.log(error)
    this.error = error.error.mensaje;
    console.log(this.error)
    if(this.error == undefined){
      this.error = "Usuario o contraseña Erroneas";
    }
  }

  ngOnInit(): void {
    this.tipo="Usuario";
  }
  propietario
  loginToken(){
    this.Jarwis.me(this.token).subscribe(data=>{
      if(data == null){
        this.error = "Token erroneo";
      }else{
        this.user = data;
        this.Jarwis.propietario(this.token,this.user.id).subscribe(response=>{
          this.propietario=response
          this.Token.handleAuth(this.token);
          this.Token.handleRole(this.user.roles[0].rolNombre);
          this.Token.handleID(this.propietario.idPropietario)
          this.Auth.changeAuthStatus(true);
          this.router.navigateByUrl('/home');
          console.log(response)
        })
      }
    })
  }
}
