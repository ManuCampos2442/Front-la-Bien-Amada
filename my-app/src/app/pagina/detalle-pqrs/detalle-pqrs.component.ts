import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallePQRSDTO } from 'src/app/modelo/DetallePQRSDTO';
import { ItemPQRSDTO } from 'src/app/modelo/ItemPQRSDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';

@Component({
  selector: 'app-detalle-pqrs',
  templateUrl: './detalle-pqrs.component.html',
  styleUrls: ['./detalle-pqrs.component.css']
})
export class DetallePqrsComponent {

  codigoPqrs: number = 0;
  pqrs: DetallePQRSDTO | undefined;
  tokenService: any;

  alerta!: Alerta;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private pacienteService: PacienteService) {

      this.route.params.subscribe(params => {
      this.codigoPqrs = params['codigo'];


      let pqrsConsultado = this.obtenerPqrs();
   

      //   let pqrsConsultado = pqrsService.obtener(parseInt(this.codigoPqrs));

      if (pqrsConsultado != undefined) {
        this.pqrs = pqrsConsultado;
      } 

    });
  }

  public obtenerPqrs() {

    this.pacienteService.verDetallePQRS(this.codigoPqrs).subscribe({
      next: data => {
        this.pqrs = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
