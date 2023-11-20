import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/pagina/login/login.component';
import { RegistroComponent } from './pagina/pagina/registro/registro.component';


//______________________________ Tema Citas ______________________________________
//import { GestionCitasPacienteComponent } from './pagina/gestion-citas-paciente/gestion-citas-paciente.component';
import { GestionCitasPacienteComponent } from './pagina/gestion-citas-paciente/gestion-citas-paciente.component';
import { AgendarCitaComponent } from './pagina/agendar-cita/agendar-cita.component';

// _____________________________ Tema con PQRS ____________________________________
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
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




const routes: Routes = [
    { path: "", component: InicioComponent },
    { path: "login", component: LoginComponent },
    { path: "registro", component: RegistroComponent },
    {
        path: "gestion-pqrs", component: GestionPqrsComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { path: "crear-pqrs", component: CrearPqrsComponent },
    {
        path: "detalle-pqrs/:codigo", component: DetallePqrsComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["paciente", "admin"] }
    },
    { 
        path: "gestion-citas-paciente", component: GestionCitasPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { path: "agendar-cita", component: AgendarCitaComponent },
    { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
    { path: "registro", component: RegistroComponent, canActivate: [LoginGuard] },
    { 
        path: "editar-perfil-paciente", component: EditarPerfilPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { 
        path: "gestion-citas-medico", component: GestionCitasMedicoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "gestion-dia-libre", component: GestionDiaLibreComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "agendar-dia-libre", component: AgendarDiaLibreComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "gestion-atencion-cita", component: GestionAtencionCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "atender-cita/:codigoCita", component: AtenderCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "detalle-cita/:codigoCita", component: DetalleCitaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente", "medico"]
        }
    },
    { 
        path: "detalle-paciente/:codigo", component: DetallePacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { 
        path: "detalle-cita-medico/:codigoCita", component: DetalleCitaMedicoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "gestion-atenciones", component: GestionAtencionesComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "detalle-atencion-medico/:codigoCita", component: DetalleAtencionMedicoComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["medico"]
        }
    },
    { 
        path: "gestion-atenciones-paciente", component: GestionAtencionesPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { 
        path: "detalle-atencion-paciente/:codigoCita", component: DetalleAtencionPacienteComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["paciente"]
        }
    },
    { path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }