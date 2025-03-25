import { Routes } from '@angular/router';
import { SupplierComponent } from './components/supplier/supplier.component';
import { QualitycontrolComponent } from './components/qualitycontrol/qualitycontrol.component';
import { DeliveryComponent } from './components/delivery/delivery.component';

export const receptionRoutes: Routes = [
  { path: 'supplier', component: SupplierComponent },
  { path: 'qualitycontrol', component: QualitycontrolComponent },
  { path: 'delivery', component: DeliveryComponent },
];
