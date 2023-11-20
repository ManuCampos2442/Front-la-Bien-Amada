import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCitaDTO } from 'src/app/modelo/DetalleCitaDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-cita-medico',
  templateUrl: './detalle-cita-medico.component.html',
  styleUrls: ['./detalle-cita-medico.component.css']
})
export class DetalleCitaMedicoComponent {

  
  detalleCita: DetalleCitaDTO | undefined;
  codigoCita = 0;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private medicoService: MedicoService) {

      this.route.params.subscribe(params => {
      this.codigoCita = params['codigoCita'];


      let citaConsultada = this.verDetalleCita();
   

      //   let pqrsConsultado = pqrsService.obtener(parseInt(this.codigoPqrs));

      if (citaConsultada != undefined) {
        this.detalleCita = citaConsultada;
      } 

    });
  }


  public verDetalleCita(){

    this.medicoService.verDetalleCita(this.codigoCita).subscribe({
      next: data => {
        this.detalleCita = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }
}
