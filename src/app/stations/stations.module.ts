import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { StationsPageComponent } from './pages/stations-page/stations-page.component';
import { StationsModalButtonComponent } from './components/stations-modal-button/stations-modal-button.component';
import { StationsModalFormComponent } from './components/stations-modal-form/stations-modal-form.component';
import { StationsModalNavbarComponent } from './components/stations-modal-navbar/stations-modal-navbar.component';
import { StationsModalTableComponent } from './components/stations-modal-table/stations-modal-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    StationsPageComponent,
    StationsModalButtonComponent,
    StationsModalFormComponent,
    StationsModalNavbarComponent,
    StationsModalTableComponent
  ],
  imports: [
    CommonModule,
    StationsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class StationsModule { }
