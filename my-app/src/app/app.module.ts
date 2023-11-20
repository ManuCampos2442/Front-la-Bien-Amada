import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/pagina/login/login.component';
import { RegistroComponent } from './pagina/pagina/registro/registro.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { GestionCitasPacienteComponent } from './pagina/gestion-citas-paciente/gestion-citas-paciente.component';
import { AgendarCitaComponent } from './pagina/agendar-cita/agendar-cita.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { EditarPerfilPacienteComponent } from './pagina/editar-perfil-paciente/editar-perfil-paciente.component';
import { GestionCitasMedicoComponent } from './pagina/gestion-citas-medico/gestion-citas-medico.component';
import { GestionDiaLibreComponent } from './pagina/gestion-dia-libre/gestion-dia-libre.component';
import { AgendarDiaLibreComponent } from './pagina/agendar-dia-libre/agendar-dia-libre.component';
import { GestionAtencionCitaComponent } from './pagina/gestion-atencion-cita/gestion-atencion-cita.component';
import { AtenderCitaComponent } from './pagina/atender-cita/atender-cita.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
import { DetallePacienteComponent } from './pagina/detalle-paciente/detalle-paciente.component';
import { DetalleCitaMedicoComponent } from './pagina/detalle-cita-medico/detalle-cita-medico.component';
import { GestionAtencionesComponent } from './pagina/gestion-atenciones/gestion-atenciones.component';
import { DetalleAtencionMedicoComponent } from './pagina/detalle-atencion-medico/detalle-atencion-medico.component';
import { GestionAtencionesPacienteComponent } from './pagina/gestion-atenciones-paciente/gestion-atenciones-paciente.component';
import { DetalleAtencionPacienteComponent } from './pagina/detalle-atencion-paciente/detalle-atencion-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    GestionPqrsComponent,
    CrearPqrsComponent,
    DetallePqrsComponent,
    AlertaComponent,
    GestionCitasPacienteComponent,
    AgendarCitaComponent,
    EditarPerfilPacienteComponent,
    GestionCitasMedicoComponent,
    GestionDiaLibreComponent,
    AgendarDiaLibreComponent,
    GestionAtencionCitaComponent,
    AtenderCitaComponent,
    DetalleCitaComponent,
    DetallePacienteComponent,
    DetalleCitaMedicoComponent,
    GestionAtencionesComponent,
    DetalleAtencionMedicoComponent,
    GestionAtencionesPacienteComponent,
    DetalleAtencionPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
