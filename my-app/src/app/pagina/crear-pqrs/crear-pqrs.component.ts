import { Component } from '@angular/core';
import { DetalleCitaDTO } from 'src/app/modelo/DetalleCitaDTO';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { RegistroPQRSDTO } from 'src/app/modelo/RegistroPQRSDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-pqrs',
  templateUrl: './crear-pqrs.component.html',
  styleUrls: ['./crear-pqrs.component.css']
})
export class CrearPqrsComponent {

  registroPQRSDTO: RegistroPQRSDTO;
  alerta!: Alerta

  citasPaciente: ItemCitaDTO[];
  detalleCita: DetalleCitaDTO | undefined;

  constructor(private pacienteService: PacienteService,
    private tokenService: TokenService) {
    this.registroPQRSDTO = new RegistroPQRSDTO();


    this.citasPaciente = [];
    this.cargarCitas();

    this.cargarCitas();
  }



  public crearPqrs() {

    const fechaActual = new Date();
    let codigo = this.tokenService.getCodigo();

    // Asignar la fecha al campo correspondiente
    this.registroPQRSDTO.estadoPQRS = 'NUEVO';
    this.registroPQRSDTO.fechaCreacion = fechaActual;
    this.registroPQRSDTO.codigoPaciente = codigo;


    this.pacienteService.crearPQRS(this.registroPQRSDTO).subscribe({
      next: data => {
        alert("PQRS registrada con exito");
        this.alerta = { tipo: "success", mensaje: data.respuesta }
      },
      error: data => {
        this.alerta = { tipo: "danger", mensaje: data.error.respuesta }
      }
    })
  }

  public cargarCitas() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarCitasPaciente(codigo).subscribe({
      next: data => {
        this.citasPaciente = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public seleccionar(codigoCita: number) {
    this.registroPQRSDTO.codigoCita = codigoCita;


    this.pacienteService.verDetalleCita(this.registroPQRSDTO.codigoCita).subscribe({
      next: data => {

        this.detalleCita = data.respuesta;

      },
      error: error => {
        console.log(error);
      }
    });


  }

  public cargarDatos(codigoCita: number) {

    let citaSeleccionada: DetalleCitaDTO;


  }

  


}
