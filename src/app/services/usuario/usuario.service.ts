import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { ServiceModule } from '../service.module';
import { Usuario } from 'src/app/models/usuario.model';
import { API_URL } from 'src/app/config/config';

@Injectable({
  providedIn: ServiceModule
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router ) {
    this.cargarUsuario();
  }

  estaLogueado() {
    return ( this.token.length > 1 ) ? true : false;
  }

  cargarUsuario() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarUsuario( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {
    const URL = API_URL + '/login/google';

    return this.http.post(URL, { token }).pipe(
      map( (resp: any) => {
        this.guardarUsuario( resp.id, resp.token, resp.usuario );
        return true;
      })
    );
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const URL = API_URL + '/login';

    return this.http.post(URL, usuario).pipe(
      map( (resp: any) => {
        this.guardarUsuario( resp.id, resp.token, resp.usuario );
        return true;
      })
    );
  }

  crearUsuario( usuario: Usuario ) {
    const URL = API_URL + '/usuario';

    return this.http.post(URL, usuario).pipe(
      map( (resp: any) => {
        swal({
          title: 'Usuario creado',
          text: usuario.email,
          icon: 'success'
        });
        return resp.usuario;
      })
    );
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

}
