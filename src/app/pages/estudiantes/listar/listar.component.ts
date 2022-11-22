import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../servicios/estudiante.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  nombreColumnas = ["Cedula", "Nombre", "Apellido", "Opciones"];
  listadoEstudiantes = [];

  constructor(private miServicioEstudiantes: EstudianteService) { }

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

}
