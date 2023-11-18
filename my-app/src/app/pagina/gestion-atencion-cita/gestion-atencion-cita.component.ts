import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-atencion-cita',
  templateUrl: './gestion-atencion-cita.component.html',
  styleUrls: ['./gestion-atencion-cita.component.css']
})
export class GestionAtencionCitaComponent {


  citasPendientes: ItemCitaDTO[];
  codigoCitaSeleccionada: number | undefined;
  alerta!: Alerta;


  constructor(private tokenService: TokenService, private pacienteService: PacienteService,
    private medicoService: MedicoService, private router: Router) {

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

  public atenderCita(){
    if (this.codigoCitaSeleccionada) {
      // Realizar alguna acción con this.codigoCitaSeleccionada, por ejemplo, navegar a la página deseada.
      this.router.navigate(['/atender-cita', this.codigoCitaSeleccionada]);
    } else {
      console.error('No se ha seleccionado ninguna cita.');
    }
  }

  
}
