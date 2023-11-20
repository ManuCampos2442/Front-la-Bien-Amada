import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleAtencionMedicoDTO } from 'src/app/modelo/DetalleAtencionMedicoDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-atencion-medico',
  templateUrl: './detalle-atencion-medico.component.html',
  styleUrls: ['./detalle-atencion-medico.component.css']
})
export class DetalleAtencionMedicoComponent {

  detalleAtencion: DetalleAtencionMedicoDTO | undefined;
  codigoCita = 0;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private medicoService: MedicoService) {

      this.route.params.subscribe(params => {
      this.codigoCita = params['codigoCita'];

      console.log(this.codigoCita);

      let citaConsultada = this.verDetalleAtencion();
   

      //   let pqrsConsultado = pqrsService.obtener(parseInt(this.codigoPqrs));

      if (citaConsultada != undefined) {
        this.detalleAtencion = citaConsultada;
      } 

    });
  }

  public verDetalleAtencion(){

    this.medicoService.verDetalleAtencion(this.codigoCita).subscribe({
      next: data => {
        this.detalleAtencion = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }
  
}
