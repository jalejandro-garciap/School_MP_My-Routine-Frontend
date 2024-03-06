import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriesRoutingModule } from './histories-routing.module';
import { HistoriesPageComponent } from './pages/histories-page/histories-page.component';
import { HistoriesTableComponent } from './components/histories-table/histories-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  
    HistoriesPageComponent,
       HistoriesTableComponent
  ],
  imports: [
    CommonModule,
    HistoriesRoutingModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class HistoriesModule { }
