import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
  ]
})
export class DashboardModule { }
