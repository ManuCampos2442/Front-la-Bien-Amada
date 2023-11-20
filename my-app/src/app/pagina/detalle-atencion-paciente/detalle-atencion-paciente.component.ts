import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleAtencionMedicoDTO } from 'src/app/modelo/DetalleAtencionMedicoDTO';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-atencion-paciente',
  templateUrl: './detalle-atencion-paciente.component.html',
  styleUrls: ['./detalle-atencion-paciente.component.css']
})
export class DetalleAtencionPacienteComponent {

  detalleAtencion: DetalleAtencionMedicoDTO | undefined;
  codigoCita = 0;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private pacienteService: PacienteService) {

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

    this.pacienteService.verDetalleAtencion(this.codigoCita).subscribe({
      next: data => {
        this.detalleAtencion = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }
  
}
