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
  infoEstudiante: Estudiante = {
    _id: "",
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

  modificarEstudiante() {
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
