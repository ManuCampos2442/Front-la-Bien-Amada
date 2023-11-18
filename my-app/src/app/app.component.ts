import { Component } from '@angular/core';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La Bien Amada';
  isLogged = false;
  email: string = "";
  rol:string = "";
  codigo: number = 0;

  constructor(private tokenService: TokenService ) { }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.rol = this.tokenService.getRole();
      this.codigo = this.tokenService.getCodigo();
    }
  }
  public logout() {
    this.tokenService.logout();
  }
}

