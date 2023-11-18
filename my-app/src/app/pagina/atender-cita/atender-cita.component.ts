import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroAtencionDTO } from 'src/app/modelo/RegistroAtencionDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-atender-cita',
  templateUrl: './atender-cita.component.html',
  styleUrls: ['./atender-cita.component.css']
})
export class AtenderCitaComponent {

  registroAtencionDTO: RegistroAtencionDTO;
  alerta!: Alerta;
  cita: number = 0; 

  constructor(private tokenService: TokenService, private route: ActivatedRoute,
    private medicoService: MedicoService){


    this.route.params.subscribe(params => {
      this.cita = params['codigoCita'];
    });

    this.registroAtencionDTO = new RegistroAtencionDTO();
    
    this.registroAtencionDTO.codigoCita = this.cita;

  }

  public atenderCita(){
    let codigo = this.tokenService.getCodigo();
    this.medicoService.atenderCita(this.registroAtencionDTO).subscribe({
      next: data => {
        alert("Registro de Atención Existoso")
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
    

  }
}
