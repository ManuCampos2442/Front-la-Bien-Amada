import { Component } from '@angular/core';
import { DiaLibreDTO } from 'src/app/modelo/DiaLibreDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-dia-libre',
  templateUrl: './gestion-dia-libre.component.html',
  styleUrls: ['./gestion-dia-libre.component.css']
})
export class GestionDiaLibreComponent {

  diasLibres: DiaLibreDTO[];

  constructor(private tokenService: TokenService, private medicoService: MedicoService) {

    this.diasLibres = [];
    this.obtencionDiasLibres();

  }


  public obtencionDiasLibres() {
    let codigo = this.tokenService.getCodigo();
    this.medicoService.listarDiasLibres(codigo).subscribe({
      next: data => {
        this.diasLibres = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
