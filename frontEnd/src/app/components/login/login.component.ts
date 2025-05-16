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
  notificationMessage: string = '';
  notificationType: string = '';
  showNotification: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    console.log('LoginComponent instanciado');
  }

  private clearFields() {
    this.mail = '';
    this.contrasena = '';
    this.nombre = '';
  }

  private showTempNotification(message: string, type: 'success' | 'error' | 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 1000);
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  login() {
    if (!this.mail || !this.contrasena) {
      this.showTempNotification('Todos los campos son requeridos.', 'error');
      return;
    }
  
    const credentials = {
      mail: this.mail,
      contraseña: this.contrasena
    };
  
    this.userService.login(credentials).subscribe(
      response => {
        console.log('Inicio de sesión exitoso:', response);
        this.showTempNotification('Inicio de sesión exitoso.', 'success');
        this.clearFields();  
        setTimeout(() => this.router.navigate(['/ot']), 1000);
      },
      error => {
        console.error('Error al iniciar sesión:', error);
        this.showTempNotification('Contraseña o correo incorrecto.', 'error');
      }
    );
  }
  
  register() {
    if (!this.nombre || !this.mail || !this.contrasena) {
      this.showTempNotification('Todos los datos son necesarios.', 'error');
      return;
    }
    if (!this.isValidEmail(this.mail)) {
      this.showTempNotification('El correo no tiene un formato válido.', 'error');
      return;
    }
    const userData = {
      nombre: this.nombre,
      mail: this.mail,
      IdTipoUsuario: 1,
      contraseña: this.contrasena
    };
  
    this.userService.register(userData).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.showTempNotification('Usuario creado exitosamente.', 'success');
        setTimeout(() => this.router.navigate(['/historial']), 2000);
        this.clearFields();  
       
      },
      error => {
        console.error('Error al registrar:', error);
        if (error.status === 400) {
          this.showTempNotification('El correo o nombre ya está en uso.', 'error');
        } else {
          this.showTempNotification('Error al registrar. Intente nuevamente.', 'error');
        }
      }
    );
  }
}