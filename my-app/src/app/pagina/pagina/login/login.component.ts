import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { LoginDTO } from 'src/app/modelo/login-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginDTO: LoginDTO;
  alerta!: Alerta;

  constructor(private authService: AuthService, private tokenService: TokenService) {

    this.loginDTO = new LoginDTO();
  }


  public login() {

    this.authService.login(this.loginDTO).subscribe({
      next: (data: { respuesta: { token: any; }; }) => {
        
        this.tokenService.login(data.respuesta.token);
      },
      error: (error: { error: { respuesta: any; }; }) => {
        alert("La cuenta ya ha sido eliminada o no existe");
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

}
