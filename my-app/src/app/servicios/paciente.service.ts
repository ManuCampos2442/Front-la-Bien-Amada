import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroPQRSDTO } from '../modelo/RegistroPQRSDTO';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { DetallePacienteDTO } from '../modelo/DetallePacienteDTO';
import { RegistroCitaDTO } from '../modelo/RegistroCitaDTO';
import { RegistroRespuestaDTO } from '../modelo/RegistroRespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private userUrl = "http://localhost:8080/api/pacientes";
  constructor(private http: HttpClient) { }
  
  public verDetallePaciente(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-paciente/${codigo}`);
  }
  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }
  public editarPerfil(pacienteDTO: DetallePacienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil`, pacienteDTO);
  }
  public crearPQRS(registroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs`, registroPQRSDTO);
  }
  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs-paciente/${codigoPaciente}`);
  }
  public listarCitasPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-citas-paciente/${codigoPaciente}`);
  }
  public agendarCita(registroCitaDTO: RegistroCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/agendar-cita`, registroCitaDTO);
  }
  public verDetallePQRS(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-pqrs/${codigo}`);
  }
  public filtrarCitasPorFecha(codigoPaciente: number, fecha: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/filtar-cita-fecha/${codigoPaciente}/${fecha}`);
  }
  public filtrarCitasPorMedico(codigoPaciente: number, codigoMdico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/filtar-cita-medico/${codigoPaciente}/${codigoMdico}`);
  }
  public verDetalleCita(codigoCita: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-cita/${codigoCita}`);
  }
  public responderPQRS(registroRespuestaDTO: RegistroRespuestaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/responder-pqrs`, registroRespuestaDTO);
  }
  public listarMensajes(codigoPQRS: number, codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/listar-mensajes/${codigoPQRS}/${codigoPaciente}`);
  }
  public listarHistorialAtenciones(codigoCita: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/atenciones/${codigoCita}`);
  }
  public listarCitasRealizadas(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/citas-completadas/${codigoPaciente}`);
  }
  public verDetalleAtencion(codigoCita: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle-atencion/${codigoCita}`);
  }
  public filtrarAtencionesPorFecha(codigoPaciente: number, fecha: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/filtar-atencion-fecha/${codigoPaciente}/${fecha}`);
  }
  public filtrarAtencionesPorMedicox(codigoPaciente: number, codigoMdico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/filtar-atencion-medico/${codigoPaciente}/${codigoMdico}`);
  }

}
