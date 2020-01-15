import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceModule } from '../service.module';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: ServiceModule
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               public router: Router ) { }

  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
