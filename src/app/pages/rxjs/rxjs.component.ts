import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {
    this.subscripcion = this.retornaObservable()./*pipe(
      retry(2)
    ).*/subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el subs', error),
      () => console.log('Obs completado')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  retornaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('error');
        // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( (valor, index ) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
