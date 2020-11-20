import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EncryptDecryptService } from '../services/Encrypt-decrypt/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    private encryptDecryptService:EncryptDecryptService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = sessionStorage.getItem('currentUser');
      if(token ) {
        let decryptString = this.encryptDecryptService.decrypt(token);
        if(decryptString) {
          return true;
        } else {
          sessionStorage.removeItem('currentUser');
          sessionStorage.removeItem('empUserTime');
          return false;
        }
      } else {
        this.router.navigate(['/login']);
      }
      return false;

  }

}
