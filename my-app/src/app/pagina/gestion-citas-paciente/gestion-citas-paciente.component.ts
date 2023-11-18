import { Component } from '@angular/core';
import { FiltroBusquedaDTO } from 'src/app/modelo/FiltroBusquedaDTO';
import { ItemCitaDTO } from 'src/app/modelo/ItemCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { CitaService } from 'src/app/servicios/cita.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-citas-paciente',
  templateUrl: './gestion-citas-paciente.component.html',
  styleUrls: ['./gestion-citas-paciente.component.css']
})
export class GestionCitasPacienteComponent {

  citas: ItemCitaDTO[];

  citasPorFecha: FiltroBusquedaDTO[];
  citasPorCodigoMedico: FiltroBusquedaDTO[];

  fecha: string = "";
  alerta!: Alerta;



  filtroBusquedaDTO: FiltroBusquedaDTO;
 





  constructor(private tokenService: TokenService, private pacienteService: PacienteService) {

    this.filtroBusquedaDTO = new FiltroBusquedaDTO();



    this.citas = [];
    this.obtencionCitas();


    this.citasPorFecha = [];
    this.citasPorCodigoMedico = [];


  }


  public filtrarCitasPorMedico() {
    let codigoPaciente = this.tokenService.getCodigo();
    let codigoMedico = this.filtroBusquedaDTO.codigoMedico;

    if(codigoMedico == 0){
      alert("Ingrese un valor diferente de 0");
    }

    this.pacienteService.filtrarCitasPorMedico(codigoPaciente, codigoMedico).subscribe({
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
    this.pacienteService.filtrarCitasPorFecha(codigoPaciente, fecha).subscribe({
      next: data => {
        this.citasPorFecha = data.respuesta;

      },
      error: error => {
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
        console.log(error);
      }
    });

  }



  public obtencionCitas() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarCitasPaciente(codigo).subscribe({
      next: data => {
        this.citas = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
