import { Injectable } from '@angular/core';
import { ItemCitaDTO } from '../modelo/ItemCitaDTO';
import { RegistroCitaDTO } from '../modelo/RegistroCitaDTO';
import { TokenService } from './token.service';
import { PacienteService } from './paciente.service';

@Injectable({
  providedIn: 'root'
})

export class CitaService {





  constructor(private tokenService: TokenService, private pacienteService: PacienteService) {
    

  }



  public crear(citas: RegistroCitaDTO) {

   /*  let codigo = this.citas.length + 1;


    this.citas.push({
      codigoCita: codigo, cedulaPaciente: '', nombrePaciente: "", nombreMedico: "",
      especialidad: "", estadoCita: "", fecha: new
        Date().toISOString()
    }); */
  }
}
