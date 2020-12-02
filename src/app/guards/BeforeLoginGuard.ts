import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/TokenService';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | Observable<boolean> | Promise<boolean> {
    if(this.Token.loggedIn()){
      this.router.navigateByUrl('/home');
    }
    return !this.Token.loggedIn();
  }
  constructor(private Token: TokenService, private router: Router) { }
  
}
