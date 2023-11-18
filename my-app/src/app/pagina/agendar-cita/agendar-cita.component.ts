import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMedicoDTO } from 'src/app/modelo/ItemMedicoDTO';
import { RegistroCitaDTO } from 'src/app/modelo/RegistroCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MensajeDTO } from 'src/app/modelo/mensaje-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {

  alerta!: Alerta;

  registroCitaDTO: RegistroCitaDTO;
  especialidades: String[]
  medicoPorEspecialidad: ItemMedicoDTO[];

  especialidad: string = '';


  public cargarDatos(){
    let codigo = this.tokenService.getCodigo();
    this.registroCitaDTO.codigoPaciente = codigo;

    this.registroCitaDTO.sede = "SLYTHERIN";
    this.registroCitaDTO.estadoCita = "PROGRAMADA";

  }

  public seleccionar(codigoMedico: number) {
    this.registroCitaDTO.codigoMedico = codigoMedico;
  }

  private cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        console.log(this.especialidades);
        this.especialidades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  /*private listarMedicoPorEspecialidad() {
    this.clinicaService.listarMedicoPorEspecialidad(this.especialidad).subscribe({
      next: data => {
        console.log(this.especialidades);
        this.medicoPorEspecialidad = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  } */

  // medicoPorEspecialidad: any[];

  private listarMedicoPorEspecialidad(especialidad: string) {
    this.clinicaService.listarMedicoPorEspecialidad(especialidad).subscribe({
      next: data => {
        this.medicoPorEspecialidad = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public listarMedicos(event: any) {
    this.listarMedicoPorEspecialidad(event.target.value);
  }

  constructor(private clinicaService: ClinicaService, private citaService: CitaService,
    private pacienteService: PacienteService, private tokenService: TokenService) {
    this.registroCitaDTO = new RegistroCitaDTO();

    this.especialidades = [];
    this.cargarEspecialidades();

    this.medicoPorEspecialidad = [];

    this.cargarDatos();

  }


  public agendarCita() {
    this.pacienteService.agendarCita(this.registroCitaDTO).subscribe({
      next: data => {
        alert("Registro Exitoso")
        console.log(data);
      },
      error: error => {
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
        console.log(error);
      }
    });
  }
  
}
