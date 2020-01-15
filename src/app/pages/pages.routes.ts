import { RouterModule, Routes } from '@angular/router';

// GUARDS
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'Descripción de la página Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', descripcion: 'Descripción de la página Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', descripcion: 'Descripción de la página Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'Descripción de la página Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables', descripcion: 'Descripción de la página Observables' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema', descripcion: 'Descripción de la página Ajustes de Tema' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
