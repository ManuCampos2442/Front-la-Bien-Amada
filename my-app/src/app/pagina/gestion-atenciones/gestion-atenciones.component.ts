import { Component } from '@angular/core';
import { DetalleAtencionMedicoDTO } from 'src/app/modelo/DetalleAtencionMedicoDTO';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-atenciones',
  templateUrl: './gestion-atenciones.component.html',
  styleUrls: ['./gestion-atenciones.component.css']
})
export class GestionAtencionesComponent {

  atenciones: DetalleAtencionMedicoDTO[];
  citasRealizadas: ItemCitaDTO[];

  constructor(private tokenService: TokenService, private medicoService: MedicoService) {

    this.atenciones = [];

    this.citasRealizadas = [];
    this.obtencionCitasRealizadas();

    this.verDetalleAtencion();

    //console.log(this.citasRealizadas);
  }

  public verDetalleAtencion() {
    this.obtencionCitasRealizadas().then(() => {
      // Inicializa this.atenciones como un array vacío
      this.atenciones = [];
  
      // Realiza operaciones con las citas después de obtenerlas
      for (let i = 0; i < this.citasRealizadas.length; i++) {
        const cita = this.citasRealizadas[i].codigoCita;
  
        this.medicoService.listarHistorialAtenciones(cita).subscribe({
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
      this.medicoService.listarCitasRealizadas(codigo).subscribe({
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

  public seleccionar(codigoCita: number) {
    //this.codigoCitaSeleccionada = codigoCita;
  }

}
