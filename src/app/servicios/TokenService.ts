import { Injectable } from '@angular/core';
import { JarwisService } from './JarwisService';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'https://sheltered-scrubland-22795.herokuapp.com/api/login', //Laravel Authentification
    signup: 'https://sheltered-scrubland-22795.herokuapp.com/api/signup' //Laravel Authentification
  };
  rol: any;

  constructor(private Jarwis:JarwisService) { 
  }

  list;
  handleAuth(token) {
    this.setAuth(token);
  }
  handleID(id) {
    this.setID(id);
  }
  setAuth(token) {
    localStorage.setItem('tokenAuth', token);
  }
  setID(id) {
    localStorage.setItem('id', id);
  }
  getAuth() {
    return localStorage.getItem('tokenAuth');
  }
  removeID() {
    localStorage.removeItem('id');
  }
  removeAuth() {
    localStorage.removeItem('tokenAuth');
  }
  handleRole(rol) {
    this.setRole(rol);
  }
  setRole(rol) {
    localStorage.setItem('Role', rol);
  }
  getRole() {
    return localStorage.getItem('Role');
  }
  getID() {
    return localStorage.getItem('id');
  }
  removeRole() {
    localStorage.removeItem('Role');
  }
  



  isValid() {;
    const token = this.getAuth();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  
  payload(token) {
    //token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MjcwMjkyMiwiZXhwIjoxNTkyNzA2NTIyLCJuYmYiOjE1OTI3MDI5MjIsImp0aSI6Im5EMzk5dXYwSllRR3QxTWciLCJzdWIiOjIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.yu90nafdKbx2a0gPilFXOYwSf_T1Wb3tXFGXXFFoNvU"
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
    
  }
}
