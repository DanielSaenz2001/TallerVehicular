import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {

  endPoint ='http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/vehiculo/reparacion'
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
  create(data,token){
    return this.http.post(`${this.endPoint}/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  update(id, data,token): Observable<any> {
    return this.http.put<any>(`${this.endPoint}/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  vehiculos(token){
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/vehiculo/lista`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  detalles(token,data){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/detalles/reparacion/lista/vehiculo`,data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  etapas(token){
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/detalles/reparacion/etapas`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  presupuesto(token,data){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/lista`,data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  createEtapa(data,token){
    return this.http.post(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/detalles/reparacion/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  updateEtapa(id, data,token): Observable<any> {
    return this.http.put<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/detalles/reparacion/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioLista(data,token): Observable<any> {
    return this.http.post<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/lista`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioDetalle(id,token): Observable<any> {
    return this.http.get<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/detail/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioCrear(data,token): Observable<any> {
    return this.http.post<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioActualizar(id,data,token): Observable<any> {
    return this.http.put<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/update/${id}`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioRepuestos(data,token): Observable<any> {
    return this.http.post<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/repuestos/lista`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  servicioRepuestosEliminar(id,token): Observable<any> {
    return this.http.delete<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/repuestos/delete/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  Listarespuestos(token): Observable<any> {
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/repuestos/lista`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  crearRepuesto(data,token): Observable<any> {
    return this.http.post<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/repuestos/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
  crearservicioRepuestos(data,token): Observable<any> {
    return this.http.post<any>(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/servicio/repuestos/create`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    });
  }
}
