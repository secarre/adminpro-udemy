import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { CLIENT_ID } from 'src/app/config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  auth2: any;

  constructor( public _usuarioService: UsuarioService,
               public router: Router ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        //.subscribe( () => this.router.navigate(['/dashboard']));
        .subscribe( () => window.location.href = '#/dashboard'); // no se usa routerLink para corregir error de navegación
    });
  }

  entrar( f: NgForm) {
    if ( f.invalid ) {
      return;
    }

    let usuario = new Usuario(null, f.value.email, f.value.password);

    this._usuarioService.login(usuario, f.value.recuerdame)
      .subscribe( () => this.router.navigate(['/dashboard']));
  }

}
