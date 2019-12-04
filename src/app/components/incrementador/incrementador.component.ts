import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso', {static: false}) txtProgreso: ElementRef;

  @Input('nombre') leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output('actualiza') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange( nuevoValor: number ) {
    if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else if ( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else {
      this.progreso = nuevoValor;
    }

    this.txtProgreso.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor ) {
    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    this.progreso = this.progreso + valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgreso.nativeElement.focus();
  }

}
