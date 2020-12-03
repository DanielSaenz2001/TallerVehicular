import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  endPoint ='http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/propietario'
  constructor(private http:HttpClient) { }

  lista(data){
    return this.http.get(`${this.endPoint}/lista`,{ headers:{
      'Authorization': "Bearer " + data,
      }
    }) ;
  }
  getById(id,token){
    return this.http.get<any>(`${this.endPoint}/detail/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  createPropietario(data,token){
    return this.http.post(`${this.endPoint}/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }

  actualizarPropietario(id, data,token): Observable<any> {
    return this.http.put<any>(`${this.endPoint}/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  actualizarUsuario(id, data,token): Observable<any> {
    return this.http.put<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/usuario/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  createusuarios(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/auth/register`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  PropietarioFiltro(data,token){
    return this.http.post(`${this.endPoint}/filtrar`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  PropietarioEmail(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/email/send`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  vehiculos(id,token){
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/propietariovehiculo/lista/propietarios/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  agregarvehiculos(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/propietariovehiculo/create`,data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  ActualizarInvitado(id, data,token){
    return this.http.put<any>(`${this.endPoint}/update/invitado/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
}
