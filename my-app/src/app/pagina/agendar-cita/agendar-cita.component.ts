import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { HorarioDTO } from 'src/app/modelo/HorarioDTO';
import { ItemMedicoDTO } from 'src/app/modelo/ItemMedicoDTO';
import { RegistroCitaDTO } from 'src/app/modelo/RegistroCitaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { ChangeDetectorRef } from '@angular/core';
import { MensajeDTO } from 'src/app/modelo/mensaje-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';

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
  horarioMedico: HorarioDTO[];

  especialidad: string = '';


  public cargarDatos() {
    let codigo = this.tokenService.getCodigo();
    this.registroCitaDTO.codigoPaciente = codigo;

    this.registroCitaDTO.sede = "SLYTHERIN";
    this.registroCitaDTO.estadoCita = "PROGRAMADA";

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

  /* public listarMedicos(event: any) {
    this.listarMedicoPorEspecialidad(event.target.value);
  }  */

  constructor(private clinicaService: ClinicaService, private citaService: CitaService,
    private pacienteService: PacienteService, private tokenService: TokenService,
    private cdr: ChangeDetectorRef, private router: Router,
    private location: Location) {
    this.registroCitaDTO = new RegistroCitaDTO();

    this.especialidades = [];
    this.cargarEspecialidades();

    this.medicoPorEspecialidad = [];

    this.horarioMedico = [];


    this.cargarDatos();

  }

  public seleccionar(codigoMedico: number) {
    this.registroCitaDTO.codigoMedico = codigoMedico;
  }

  public agendarCita() {

    const scrollPosition = window.scrollY;

    this.pacienteService.agendarCita(this.registroCitaDTO).subscribe({
      next: data => {
        alert("Registro Exitoso")
        console.log(data);
      },
      error: error => {
        
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
       /*  alert(this.alerta.mensaje);
        console.log(error);
        const currentUrl = this.location.path();
  
        // Recarga la página sin cambiar la posición de desplazamiento
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          // Vuelve a la URL original después de la recarga
          this.router.navigate([currentUrl]);
  
          // Restaura la posición de desplazamiento después de la recarga
          setTimeout(() => {
            window.scrollTo(0, scrollPosition);
          });
        }); */
      }
    });
  }

  // ...

 public listarMedicos(event: any) {
  const especialidadSeleccionada = event.target.value;

  // Hacer la llamada al servicio para obtener la lista de médicos por especialidad
  this.clinicaService.listarMedicoPorEspecialidad(especialidadSeleccionada).subscribe({
    next: data => {
      this.medicoPorEspecialidad = data.respuesta;

      // Después de obtener la lista de médicos, cargar los horarios del primer médico
      if (this.medicoPorEspecialidad.length > 0) {
        const primerMedico = this.medicoPorEspecialidad[0];
        this.listarHorariosDelMedico(primerMedico.codigoMedico);
      }
      this.cdr.detectChanges();
    },
    error: error => {
      console.log(error);
    }
  });
} 

public listarHorariosDelMedico(codigoMedico: number) {
  this.clinicaService.listarHorariosMedico(codigoMedico).subscribe({
    next: data => {
      this.horarioMedico = data.respuesta;

      // Asegúrate de que 'horarios' esté definido en 'ItemMedicoDTO'
      const medicoSeleccionado = this.medicoPorEspecialidad.find(medico => medico.codigoMedico === codigoMedico);

      if (medicoSeleccionado) {
        medicoSeleccionado.horarios = this.horarioMedico.map((horario: HorarioDTO) => `${horario.horaInicio} - ${horario.horaFin}`);


      }
      console.log(this.horarioMedico);
    },
    error: error => {
      console.log(error);
    }
  });
}
// ...

  /*  public listarHorariosDelMedico(){
 
     this.clinicaService.listarHorariosMedico(24).subscribe({
       next: data => {
         this.horarioMedico = data.respuesta;
   
         console.log(this.horarioMedico)
       },
       error: error => {
         console.log(error);
       }
     });
   }  */


}
