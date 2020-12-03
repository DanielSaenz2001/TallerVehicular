import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  endPoint ='http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/vehiculo'
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
  filtro(data,token){
    return this.http.post(`${this.endPoint}/filtrar`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
  vehiculos(id,token){
    return this.http.get(`http://ec2-3-239-129-10.compute-1.amazonaws.com:8080/propietariovehiculo/lista/vehiculos/${id}`,{ headers:{
      'Authorization': "Bearer " + token,
      }
    }) ;
  }
}
