import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service'; 

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {  
    if (this.userService.checkLoginStatus()) { 
      const userType = this.userService.getIdTipoUsuario();
      if (userType === 2) {
      
        return true;
      } else {
       
        return true; 
      }
    } else {
      
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
