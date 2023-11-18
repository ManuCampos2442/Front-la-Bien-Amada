import { Component } from '@angular/core';
import { DiaLibreDTO } from 'src/app/modelo/DiaLibreDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-agendar-dia-libre',
  templateUrl: './agendar-dia-libre.component.html',
  styleUrls: ['./agendar-dia-libre.component.css']
})
export class AgendarDiaLibreComponent {

  diaLibreDTO: DiaLibreDTO;
  alerta!: Alerta;

  constructor(private tokenService: TokenService, private medicoService: MedicoService) {

    this.diaLibreDTO = new DiaLibreDTO();

  }

  public agendarDiaLibre() {

    let codigo = this.tokenService.getCodigo();

    this.diaLibreDTO.codigoMedico = codigo;

    this.medicoService.agendarDiaLibre(this.diaLibreDTO).subscribe(
      {
        next: data => {
          alert("Dia agendado con exito")
          this.alerta = { tipo: "success", mensaje: data.respuesta }
        },
        error: data => {
          this.alerta = { tipo: "danger", mensaje: data.error.respuesta }
        }
      })

  }


}
