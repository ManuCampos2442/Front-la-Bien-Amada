import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCitaDTO } from 'src/app/modelo/DetalleCitaDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {


  detalleCita: DetalleCitaDTO | undefined;
  codigoCita = 0;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private pacienteService: PacienteService) {

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

    this.pacienteService.verDetalleCita(this.codigoCita).subscribe({
      next: data => {
        this.detalleCita = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }
}
