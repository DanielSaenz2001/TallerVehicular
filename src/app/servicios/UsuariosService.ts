import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  endPoint ='http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/usuario'
  constructor(private http:HttpClient) { }

  usuarios(data){
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/lista`,{ headers:{
      'Authorization': "Bearer " + data,
      }
    }) ;
  }
  roles(data){
    return this.http.get(`${this.endPoint}/roles`,{ headers:{
      'Authorization': "Bearer " + data,
      }
    }) ;
  }
  getById(id,token){
    return this.http.get<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/detail/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  usuariosFiltro(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/filtrar`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }

  public actualizarEmpleado(id, data,token): Observable<any> {
    return this.http.put<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  public actualizarUsuario(id, data,token): Observable<any> {
    return this.http.put<any>(`${this.endPoint}/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  public createusuarios(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/auth/register`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  public createEmpleado(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  /*public actualizarAutorizacionUsuario(id, data,token): Observable<any> {
    return this.http.put<any>(`${this.endPoint}actualizarAutorizacionUsuario/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }*/
  UsuarioNoAdmin(id, data,token){
    return this.http.put<any>(`${this.endPoint}/update/noadmin/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  ActualizarEmpleado(id, data,token){
    return this.http.put<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/empleado/update/empleado/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
}
