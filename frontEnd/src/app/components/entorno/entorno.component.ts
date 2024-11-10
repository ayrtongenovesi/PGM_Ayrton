import { Component, OnInit } from '@angular/core';
import { UserService } from  '../../../service/services/user.service';

@Component({
  selector: 'app-entorno',  
  templateUrl: './entorno.component.html',
  styleUrls: ['./entorno.component.css']
})
export class EntornoComponent implements OnInit {
  isAdmin: boolean = false; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   
    const userType = this.userService.getIdTipoUsuario();
    this.isAdmin = userType === 2;  
  }
}