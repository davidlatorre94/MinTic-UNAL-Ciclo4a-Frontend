import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  correo: string = "";
  contrasena: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    console.log("Correo:", this.correo, "Contraseña:", this.contrasena)
  }

}
