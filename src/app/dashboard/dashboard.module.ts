import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardCardComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    NgChartsModule,
  ]
})
export class DashboardModule { }
