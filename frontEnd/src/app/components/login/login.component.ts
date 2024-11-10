import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  mail: string = ''; 
  contrasena: string = ''; 
  nombre: string = ''; 

  constructor(private userService: UserService, private router: Router) {
    console.log('LoginComponent instanciado'); // Verifica que el componente se cargue
}

  
  register() {
      const userData = {
          nombre: this.nombre,
          mail: this.mail, 
          IdTipoUsuario: 1, 
          contraseña: this.contrasena 
      };

      this.userService.register(userData).subscribe(
          response => {
              console.log('Registro exitoso:', response);
              this.router.navigate(['/inicio']); 
          },
          error => {
              console.error('Error al registrar:', error);
          }
      );
  }

  
  login() {
    const credentials = {
        mail: this.mail, 
        contraseña: this.contrasena 
    };
    
    this.userService.login(credentials).subscribe(
        response => {
            console.log('Inicio de sesión exitoso:', response);
            this.router.navigate(['/inicio']); 
        },
        error => {
            console.error('Error al iniciar sesión:', error);
        }
    );
}
}
