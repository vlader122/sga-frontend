import { ActivosComponent } from './app/pages/activos/activos.component';
import { CategoriasComponent } from './app/pages/categorias/categorias.component';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AccesorGuard } from './app/config/accesor.guard';
import { LoginComponent } from './app/login/login.component';

export const appRoutes: Routes = [

    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            {
                path: 'categorias',
                component: CategoriasComponent
            },
            {
                path: 'activos',
                component: ActivosComponent
            }
        ],
        canActivate: [AccesorGuard]
    },
    { path: 'login', component: LoginComponent},
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
