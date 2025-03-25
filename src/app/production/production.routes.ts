import { Routes } from '@angular/router';

import { StockageComponent } from './stockage/stockage.component';
import { ProductionComponent } from './production/production.component';

export const productionRoutes: Routes = [
  { path: 'production', component: ProductionComponent },
  { path: 'stockage', component: StockageComponent },

];
