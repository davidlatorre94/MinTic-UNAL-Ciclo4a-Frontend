import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Estudiante } from '../modelos/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  buscarTodosLosEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${environment.url_api_gateway}/estudiante`);
  }

  buscarEstudiantePorId(idEstudiante: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${environment.url_api_gateway}/estudiante/${idEstudiante}`);
  }

  crearEstudiante(infoEstudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${environment.url_api_gateway}/estudiante`, infoEstudiante);
  }

  modificarEstudiante(infoEstudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${environment.url_api_gateway}/estudiante`, infoEstudiante);
  }

  eliminarEstudiante(idEstudiante: string) {
    return this.http.delete(`${environment.url_api_gateway}/estudiante/${idEstudiante}`);
  }


}
