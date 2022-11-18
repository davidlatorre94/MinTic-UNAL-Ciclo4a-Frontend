import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  elUsuario = new BehaviorSubject<Usuario>(new Usuario);

  constructor(private http: HttpClient) {
    this.validarSesion();
  }

  /**
   * Permite obtener la información de usuario 
   * que tiene la función activa y servirá
   * para acceder a la información del token
   */
  public get usuarioSesionActiva(): Usuario {
    return this.elUsuario.value;
  }

  /**
   * Permite actualizar la información del usuario
   * que acabó de validarse correctamente
   * @param user información del usuario logueado
   */
  setUsuario(infoUsuario: Usuario) {
    this.elUsuario.next(infoUsuario);
  }

  /**
   * Permite obtener la información del usuario
   * con datos tales como el identificador y el token
   * @returns 
   */
  getUsuario() {
    return this.elUsuario.asObservable();
  }

  /**
   * Guarda los datos tales como el identificador
   * y token del usuario en una base de datos 
   * interna del navegador llamada local storage
   * @param datosSesion información del usuario
   * @returns un booleano que indica si la información 
   * fue almacenada correctamente
   */
  guardarDatosSesion(infoUsuario: Usuario) {
    localStorage.setItem('sesion', JSON.stringify(infoUsuario));
    this.setUsuario(infoUsuario);
  }

  /**
   * Permite cerrar la sesión del usuario
   * que estaba previamente logueado
   */
  eliminarDatosSesion() {
    localStorage.removeItem('sesion');
    this.setUsuario(new Usuario());
  }

  /**
   * Permite obtener los dato de la sesión activa en el 
   * local storage
   * @returns 
   */
  obtenerDatosSesion() {
    return localStorage.getItem('sesion');
  }

  /**
   * Verifica si hay una sesion activa 
   * @returns 
   */
  validarSesion(): boolean {
    let sesionActual = this.obtenerDatosSesion();
    return sesionActual != null ? true : false;
  }

  /**
   * Realiza la petición al backend con el correo y la contraseña
   * para verificar si existe o no en la plataforma
   * @param infoUsuario JSON con la información de correo y contraseña
   * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
   */
  login(infoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.url_api_gateway}/login`, infoUsuario);
  }

}
