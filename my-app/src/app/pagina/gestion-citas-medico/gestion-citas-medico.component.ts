import { Component } from '@angular/core';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-citas-medico',
  templateUrl: './gestion-citas-medico.component.html',
  styleUrls: ['./gestion-citas-medico.component.css']
})
export class GestionCitasMedicoComponent {

  citasPendientes: ItemCitaDTO[];
  citasRealizadas: ItemCitaDTO[];
  citasCanceladas: ItemCitaDTO[];

  constructor(private tokenService: TokenService, private pacienteService: PacienteService,
    private medicoService: MedicoService) {

    this.citasPendientes = [];
    this.obtencionCitas();

    this.citasRealizadas = [];
    this.obtencionCitasRealizadas();

    this.citasCanceladas = [];
    this.obtencionCitasCanceladas();

    

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

  public obtencionCitasRealizadas() {
    let codigo = this.tokenService.getCodigo();
    this.medicoService.listarCitasRealizadas(codigo).subscribe({
      next: data => {
        this.citasRealizadas = data.respuesta;
        console.log(this.citasRealizadas);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public obtencionCitasCanceladas() {
    let codigo = this.tokenService.getCodigo();
    
    this.medicoService.listarCitasCanceladas(codigo).subscribe({
      next: data => {
        this.citasCanceladas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
