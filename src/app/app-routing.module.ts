import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import {receptionRoutes} from "./reception/reception.routes";
import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { ProductionComponent } from './production/production/production.component';
import { productionRoutes } from './production/production.routes';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, // Structure principale avec menu
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/components/component.module').then((m) => m.ComponentModule)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/other/sample-page/sample-page.component')
      },
      {
        path: 'reception',
        children: receptionRoutes
      },
      {
        path: 'configuration',
        component:ConfigurationComponent
      },
      {
        path: 'production',
        children:productionRoutes
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent, // Pour les pages d'authentification
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  { path: '**', redirectTo: '/reception/supplier' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
