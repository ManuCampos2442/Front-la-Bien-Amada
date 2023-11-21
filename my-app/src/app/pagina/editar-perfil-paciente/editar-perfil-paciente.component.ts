import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePacienteDTO } from 'src/app/modelo/DetallePacienteDTO';
import { Alerta } from 'src/app/modelo/alerta';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-editar-perfil-paciente',
  templateUrl: './editar-perfil-paciente.component.html',
  styleUrls: ['./editar-perfil-paciente.component.css']
})
export class EditarPerfilPacienteComponent {

  detallePacienteDTO: DetallePacienteDTO;
  archivos!: FileList;
  ciudades: string[];
  alerta!: Alerta;
  eps: string[];
  tipoSangre: string[];

  public editarPerfil(){

    if (this.detallePacienteDTO.urlFoto.length != 0) {
      this.pacienteService.editarPerfil(this.detallePacienteDTO).subscribe({
        next: data => {
          this.subirImagen();
          alert("Edicion de perfil exitoso")
          console.log(data);
          this.router.navigate(['/detalle-paciente/:codigo']);
        },
        error: error => {
          alert("Asegurate de llenar todos los campos primero")
          this.alerta = { tipo: "danger", mensaje: error.error.respuesta }
          console.log(error);
        }
      });
    } else {
      alert("Asegurate de llenar todos los campos y subir una imagen")
      console.log("Debe subir una imagen");
    }

  }

  getMaxDate(): string {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  constructor(private authService: AuthService,
    private clinicaService: ClinicaService, private imagenService: ImagenService,
    private pacienteService: PacienteService, private tokenService: TokenService,
    private router: Router) {

    this.detallePacienteDTO = new DetallePacienteDTO();

    this.ciudades = [];
    this.cargarCiudades();

    this.eps = [];
    this.cargarEPS();

    this.tipoSangre = [];
    this.cargarTipoSangre();

    this.detallePacienteDTO.codigo = tokenService.getCodigo();
  }


  private cargarCiudades() {

    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  private cargarEPS() {

    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  private cargarTipoSangre() {

    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tipoSangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({

        next: (data: { respuesta: { url: string; }; }) => {
          this.detallePacienteDTO.urlFoto = data.respuesta.url;
        },
        error: (error: { error: any; }) => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.detallePacienteDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

  public eliminarCuenta() {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar tu cuenta?');
  
    if (confirmacion) {
      let codigo = this.tokenService.getCodigo();
  
      this.pacienteService.eliminarCuenta(codigo).subscribe({
        next: data => {
          alert('Cuenta eliminada con éxito');
          this.tokenService.logout();
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      // El usuario ha cancelado la operación
      console.log('Operación de eliminación de cuenta cancelada');
    }
  }
  
}
