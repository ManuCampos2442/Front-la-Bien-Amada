import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallePacienteDTO } from 'src/app/modelo/DetallePacienteDTO';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent {

  detallePacienteDTO: DetallePacienteDTO | undefined;
  codigoPaciente: number = 0;

  public verDetallePaciente(){

    let codigo = this.tokenService.getCodigo();

    this.pacienteService.verDetallePaciente(codigo).subscribe({
      next: data => {
        this.detallePacienteDTO = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  constructor(private pacienteService: PacienteService,
     private tokenService: TokenService, private route: ActivatedRoute){

      this.route.params.subscribe(params => {
        this.codigoPaciente = params['codigo'];
  
  
        let pacienteConsultado = this.verDetallePaciente();
     
  
        //   let pqrsConsultado = pqrsService.obtener(parseInt(this.codigoPqrs));
  
        if (pacienteConsultado != undefined) {
          this.detallePacienteDTO = pacienteConsultado;
        } 

      });
  }

  
}
