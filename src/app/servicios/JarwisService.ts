import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = 'http://192.168.1.35:8080/auth'; //Laravel Autentification

  constructor(private http: HttpClient) { }

  signupadministrador(data,token) {
    return this.http.post(`${this.baseUrl}/register`, data,{ headers:{
      'Authorization': "Bearer " + token,
      }
    })
  }
  
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }
  
  me(data) {
    return this.http.get(`${this.baseUrl}/me`,{ headers:{
      'Authorization': "Bearer " + data,
      }
    })
  }
  empleado(token,data) {
    return this.http.post(`${this.baseUrl}/empleado`, {
      "idUsuario": {
        "idUsuario": data
      }
    },{ headers:{
      'Authorization': "Bearer " + token,
      }
    })
  }
  propietario(token,data) {
    return this.http.post(`${this.baseUrl}/propietario`, {
      "idUsuario": {
        "idUsuario": data
      }
    },{ headers:{
      'Authorization': "Bearer " + token,
      }
    })
  }
}
