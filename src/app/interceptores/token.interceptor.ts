import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ENGINE_METHOD_CIPHERS } from 'constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private miServicioSeguridad: SeguridadService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    /** 
     * Aquí preguntarmos si hay una sesión activa, es decir, 
     * si ya el usuario está logeado.
     * Con el fin de que si ya está logeado, 
     * todas las peticiones que realice el usuario le ponemos el token.
    */
    let infoUsuario = this.miServicioSeguridad.usuarioSesionActiva;
    if(this.miServicioSeguridad.usuarioSesionActiva) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${infoUsuario.token}`
        }
      });
    } 
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == 401) {
          this.router.navigateByUrl('/pages/seguridad/login');
        }
        return throwError(err);
      })
    );
  }

}
