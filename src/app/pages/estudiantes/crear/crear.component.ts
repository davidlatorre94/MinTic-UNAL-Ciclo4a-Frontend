import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { timeStamp } from 'console';
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
  };

  constructor(private miServicioEstudiante: EstudianteService,
    private router: Router,
    private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.id_estudiante) {
      this.modoCreacion = false;
      this.infoEstudiante._id = this.rutaActiva.snapshot.params.id_estudiante;
      this.buscarEstudiante(this.infoEstudiante._id);
    } else {
      this.modoCreacion = true;
    }
  }

  buscarEstudiante(idEstudiante: string) {
    this.miServicioEstudiante.buscarEstudiantePorId(this.infoEstudiante._id)
      .subscribe(
        data => {
          this.infoEstudiante = data;
        }
      );
  }

  crearEstudiante() {
    let camposValidos = this.validarCampos();
    if(camposValidos) {
      this.miServicioEstudiante.crearEstudiante(this.infoEstudiante)
      .subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Estudiante Creado!',
            showConfirmButton: true,
          })
          this.router.navigateByUrl("pages/estudiantes/listar");
        }
      );
    }    
  }

  modificarEstudiante() {

    let camposValidos = this.validarCampos();
    
    if (camposValidos) {
      this.miServicioEstudiante.modificarEstudiante(this.infoEstudiante)
      .subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Estudiante actualizado!',
            showConfirmButton: true,
          })

          this.router.navigateByUrl("pages/estudiantes/listar");
        }
      );
    }
    
  }

  validarCampos() {
    this.intentoEnvio = true;
    if(this.infoEstudiante.cedula == "" || this.infoEstudiante.nombre == ""
      || this.infoEstudiante.apellido == "" ) {
        return false; 
    } else {
      return true;
    }
  }


}
