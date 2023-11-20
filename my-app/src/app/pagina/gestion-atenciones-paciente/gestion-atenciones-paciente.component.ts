import { Component } from '@angular/core';
import { DetalleAtencionMedicoDTO } from 'src/app/modelo/DetalleAtencionMedicoDTO';
import { FiltroBusquedaDTO } from 'src/app/modelo/FiltroBusquedaDTO';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-atenciones-paciente',
  templateUrl: './gestion-atenciones-paciente.component.html',
  styleUrls: ['./gestion-atenciones-paciente.component.css']
})
export class GestionAtencionesPacienteComponent {
  atenciones: DetalleAtencionMedicoDTO[];
  citasRealizadas: ItemCitaDTO[];


  filtroBusquedaDTO: FiltroBusquedaDTO;
  filtroAtencion: DetalleAtencionMedicoDTO;

  citasPorFecha: FiltroBusquedaDTO[];
  citasPorCodigoMedico: FiltroBusquedaDTO[];

  alerta!: Alerta;

  constructor(private tokenService: TokenService, private pacienteService: PacienteService) {

    this.atenciones = [];

    this.citasRealizadas = [];
    this.obtencionCitasRealizadas();

    this.verDetalleAtencion();

    this.filtroBusquedaDTO = new FiltroBusquedaDTO();
    this.filtroAtencion = new DetalleAtencionMedicoDTO();

    this.citasPorFecha = [];
    this.citasPorCodigoMedico = [];


    //console.log(this.citasRealizadas);
  }

  public verDetalleAtencion() {
    this.obtencionCitasRealizadas().then(() => {
      // Inicializa this.atenciones como un array vacío
      this.atenciones = [];

      // Realiza operaciones con las citas después de obtenerlas
      for (let i = 0; i < this.citasRealizadas.length; i++) {
        const cita = this.citasRealizadas[i].codigoCita;

        this.pacienteService.listarHistorialAtenciones(cita).subscribe({
          next: data => {
            // Agrega las atenciones al array existente en lugar de sobrescribirlo
            this.atenciones = this.atenciones.concat(data.respuesta);
            console.log(this.atenciones);
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }



  public obtencionCitasRealizadas(): Promise<void> {

    return new Promise<void>((resolve, reject) => {

      let codigo = this.tokenService.getCodigo();
      this.pacienteService.listarCitasRealizadas(codigo).subscribe({
        next: data => {
          this.citasRealizadas = data.respuesta;
          // console.log(this.citasRealizadas); // Imprime las citas realizadas
          resolve(); // Resuelve la promesa cuando se han obtenido las citas
        },
        error: error => {
          console.log(error);
          reject(); // Rechaza la promesa en caso de error
        }
      });
    });
  }


  public obtenerAtenciones() {
    this.citasRealizadas
  }

  public filtrarCitasPorMedico() {
    let codigoPaciente = this.tokenService.getCodigo();
    let codigoMedico = this.filtroBusquedaDTO.codigoMedico;

    if (codigoMedico == 0) {
      alert("Ingrese un valor diferente de 0");
    }

    this.pacienteService.filtrarAtencionesPorMedicox(codigoPaciente, codigoMedico).subscribe({
      next: data => {
        this.citasPorCodigoMedico = data.respuesta;

      },
      error: error => {
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
        console.log(error);
      }
    });
  }

  public citasFecha(event: any) {
    this.filtrarCitasPorFecha(event.target.value)
  }

  public filtrarCitasPorFecha(fecha: string) {
    let codigoPaciente = this.tokenService.getCodigo();

    this.pacienteService.filtrarAtencionesPorFecha(codigoPaciente, fecha).subscribe({
      next: data => {
        this.citasPorFecha = data.respuesta;

      },
      error: error => {
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
        console.log(error);
      }
    });

  }

}
