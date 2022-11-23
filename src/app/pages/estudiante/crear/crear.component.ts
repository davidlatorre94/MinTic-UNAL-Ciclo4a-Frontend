import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estudiante } from '../../../modelos/estudiante.model';
import { EstudianteService } from '../../../servicios/estudiante.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  modoCreacion: boolean = true;
  intentoEnvio: boolean = false;
  infoEstudiante: Estudiante = {
    cedula: "",
    nombre: "",
    apellido: ""
  }

  constructor(private miServicioEstudiante: EstudianteService,
    private rutaActual: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.rutaActual.snapshot.params.id_estudiante){
      this.modoCreacion = false;
      this.buscarEstudiante(this.rutaActual.snapshot.params.id_estudiante);
    } else {
      this.modoCreacion = true;
    }
  }

  buscarEstudiante(idEstudiante: string) {
    this.miServicioEstudiante.buscarEstudiantePorId(idEstudiante)
    .subscribe(
      data => {
        this.infoEstudiante = data;
      }
    );
  }

  actualizarEstudiante() {
    if(this.validarCampos()) {
      this.miServicioEstudiante.modificarEstudiante(this.infoEstudiante)
      .subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Estudiante Actualizado!',
            showConfirmButton: true
          })

          this.router.navigateByUrl("pages/estudiantes/listar");
        }
      );
    }
  }

  crearEstudiante() {
    if(this.validarCampos()) {
      this.miServicioEstudiante.crearEstudiante(this.infoEstudiante)
      .subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Estudiante Creado!',
            showConfirmButton: true
          })

          this.router.navigateByUrl("pages/estudiantes/listar");
        }
      );
    }    
  }

  validarCampos(): boolean {
    this.intentoEnvio = true;
    if(this.infoEstudiante.cedula == "" || this.infoEstudiante.nombre == ""
        || this.infoEstudiante.apellido == "") {
      return false;
    } else {
      return true;
    }
  }


}
