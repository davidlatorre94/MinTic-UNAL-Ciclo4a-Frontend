import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { EchartsMultipleXaxisComponent } from '../../charts/echarts/echarts-multiple-xaxis.component';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas = ["Cedula", "Nombre", "Apellido", "Opciones"];
  listadoEstudiantes = [];

  constructor(private miServicioEstudiantes: EstudianteService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarTodosLosEstudiantes();
  }

  listarTodosLosEstudiantes() {
    this.miServicioEstudiantes.listarEstudiantes().subscribe(
      data => {
        this.listadoEstudiantes = data;
      }
    );
  }

  editarEstudiante(idEstudiante: string) {
    this.router.navigateByUrl("pages/estudiantes/actualizar/"+idEstudiante);
  }

  eliminarEstudiante(idEstudiante: string) {
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Seguro que desea eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#276DD1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioEstudiantes.eliminarEstudiante(idEstudiante).subscribe(
          data => {
            Swal.fire({
              icon: 'success',
              title: 'Estudiante eliminado',
              showConfirmButton: true
            })
    
            this.listarTodosLosEstudiantes();
    
          }
        );
      }
    })    
  }

}
