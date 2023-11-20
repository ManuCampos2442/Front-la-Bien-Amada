import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DetallePQRSDTO } from 'src/app/modelo/DetallePQRSDTO';
import { ItemPQRSDTO } from 'src/app/modelo/ItemPQRSDTO';
import { RegistroRespuestaDTO } from 'src/app/modelo/RegistroRespuestaDTO';
import { RespuestaDTO } from 'src/app/modelo/RespuestaDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-pqrs',
  templateUrl: './detalle-pqrs.component.html',
  styleUrls: ['./detalle-pqrs.component.css']
})
export class DetallePqrsComponent {

  mensajesPQRS: string = '';

  codigoPqrs: number = 0;
  pqrs: DetallePQRSDTO | undefined;

  registroRespuestaDTO: RegistroRespuestaDTO;

  respuestaDTO: RespuestaDTO[];

  alerta!: Alerta;

  constructor(private route: ActivatedRoute, private pqrsService: PqrsService,
    private pacienteService: PacienteService,
    private tokenService: TokenService, private router: Router,
    private location: Location) {

    this.registroRespuestaDTO = new RegistroRespuestaDTO();


    this.respuestaDTO = [];
    this.obtenerMensajes();


    this.route.params.subscribe(params => {
      this.codigoPqrs = params['codigo'];



      let pqrsConsultado = this.obtenerPqrs();
      
      //   let pqrsConsultado = pqrsService.obtener(parseInt(this.codigoPqrs));

      if (pqrsConsultado !== undefined) {
        this.pqrs = pqrsConsultado;
      
      }

    });



    console.log(this.respuestaDTO);


  }

  public obtenerPqrs() {

    this.pacienteService.verDetallePQRS(this.codigoPqrs).subscribe({
      next: data => {
        this.pqrs = data.respuesta;
        this.obtenerMensajes();

      },
      error: error => {
        console.log(error);
      }
    });
  }


  public obtenerMensajes() {
    let codigoPaciente = this.tokenService.getCodigo();
  
    if (this.pqrs) {
      let codigoPQRS = this.pqrs.codigo;
  
      this.pacienteService.listarMensajes(codigoPQRS, codigoPaciente).subscribe({
        next: data => {
          this.respuestaDTO = data.respuesta;
  
          // Construir la cadena de mensajes
          this.mensajesPQRS = this.respuestaDTO.map(item => ` ${item.fecha}: \n ${item.mensaje} - (${item.nombreUsuario}) \n \n`).join('\n');
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
  
  /* public obtenerMensajes() {
    let codigoPaciente = this.tokenService.getCodigo();

    // Check if pqrs is defined before using it
    if (this.pqrs) {
      let codigoPQRS = this.pqrs.codigo; // Assuming 'codigo' is the property you want to pass
      this.pacienteService.listarMensajes(codigoPQRS, codigoPaciente).subscribe({
        next: data => {
          this.respuestaDTO = data.respuesta;
          console.log(this.respuestaDTO);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  } */

  public enviarMensaje() {
    this.registroRespuestaDTO.codigoPQRS = this.codigoPqrs;
    this.registroRespuestaDTO.codigoCuenta = this.tokenService.getCodigo();
  
    // Almacena la posición actual de desplazamiento
    const scrollPosition = window.scrollY;
  
    this.pacienteService.responderPQRS(this.registroRespuestaDTO).subscribe({
      next: data => {
       
        console.log(data);
  
        // Almacena la URL actual antes de la recarga
        const currentUrl = this.location.path();
  
        // Recarga la página sin cambiar la posición de desplazamiento
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          // Vuelve a la URL original después de la recarga
          this.router.navigate([currentUrl]);
  
          // Restaura la posición de desplazamiento después de la recarga
          setTimeout(() => {
            window.scrollTo(0, scrollPosition);
          });
        });
      },
      error: error => {
        this.alerta = { tipo: "danger", mensaje: error.error.respuesta };
        console.log(error);
      }
    });
  }
  
  

}
