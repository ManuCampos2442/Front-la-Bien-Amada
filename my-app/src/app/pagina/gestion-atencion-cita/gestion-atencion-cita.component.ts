import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-gestion-atencion-cita',
  templateUrl: './gestion-atencion-cita.component.html',
  styleUrls: ['./gestion-atencion-cita.component.css'],
  providers: [DatePipe],
})
export class GestionAtencionCitaComponent {


  citasPendientes: ItemCitaDTO[];
  codigoCitaSeleccionada: number | undefined;
  alerta!: Alerta;


  constructor(private tokenService: TokenService, private pacienteService: PacienteService,
    private medicoService: MedicoService, private router: Router, private datePipe: DatePipe) {

    this.citasPendientes = [];
    this.obtencionCitas();
  }


  public obtencionCitas() {
    let codigo = this.tokenService.getCodigo();
    this.medicoService.listarCitasPendientes(codigo).subscribe({
      next: data => {
        this.citasPendientes = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public seleccionar(codigoCita: number) {
    this.codigoCitaSeleccionada = codigoCita;
  }

  public atenderCita() {
     /* if (this.codigoCitaSeleccionada) {
      // Realizar alguna acción con this.codigoCitaSeleccionada, por ejemplo, navegar a la página deseada.
      this.router.navigate(['/atender-cita', this.codigoCitaSeleccionada]);
    } else {
      console.error('No se ha seleccionado ninguna cita.');
    }  */
    //________________________________________________________________________

    if (this.codigoCitaSeleccionada) {
      const citaSeleccionada = this.citasPendientes.find(cita => cita.codigoCita === this.codigoCitaSeleccionada);
    
      if (citaSeleccionada) {
        // Obtener la fecha actual en formato string
        const fechaActualString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    
        // Obtener la fecha de la cita en formato string
        const fechaCitaString = this.datePipe.transform(citaSeleccionada.fecha, 'yyyy-MM-dd');
    
        if (fechaActualString === fechaCitaString) {
          // Realizar alguna acción con this.codigoCitaSeleccionada, por ejemplo, navegar a la página deseada.
          this.router.navigate(['/atender-cita', this.codigoCitaSeleccionada]);
        } else {
          // La fecha de la cita no es hoy.
          console.error('La fecha de la cita no es hoy.');
          this.alerta = { tipo: "danger", mensaje: "La fecha de la cita no es hoy" };
        }
      } else {
        // Cita no encontrada.
        console.error('Cita no encontrada.');
        this.alerta = { tipo: "danger", mensaje: "Cita no encontrada" };
      }
    } else {
      // No se ha seleccionado ninguna cita.
      console.error('No se ha seleccionado ninguna cita.');
      this.alerta = { tipo: "danger", mensaje: "No se ha seleccionado ninguna cita" };
    }

  }
}


  

