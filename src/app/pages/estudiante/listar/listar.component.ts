import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../servicios/estudiante.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas = ['Cedula', 'Nombre', 'Apellidos', 'Opciones'];
  listadoEstudiantes = [];

  constructor(private miServicioEstudiantes: EstudianteService,
    private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosLosEstudiantes();
  }

  buscarTodosLosEstudiantes() {
    this.miServicioEstudiantes.buscarTodosLosEstudiantes().subscribe(
      data => {
        this.listadoEstudiantes = data;
      }
    );
  }

  crearEstudiante() {
    this.router.navigateByUrl("pages/estudiantes/crear");
  }

  actualizarEstudiante(idEstudiante: string) {
    this.router.navigateByUrl("pages/estudiantes/actualizar/"+idEstudiante);
  }

  eliminar(idEstudiante: string) {

    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Seguro que desea eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioEstudiantes.eliminarEstudiante(idEstudiante).subscribe(
          data => {
            Swal.fire({
              icon: 'success',
              title: 'Estudiante eliminado correctamente',
              showConfirmButton: true
            })
            this.buscarTodosLosEstudiantes();
          }
        );
      }
    })   
  }

}
