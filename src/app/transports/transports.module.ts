import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportsRoutingModule } from './transports-routing.module';
import { TransportsPageComponent } from './pages/transports-page/transports-page.component';
import { TransportsModalButtonComponent } from './components/transports-modal-button/transports-modal-button.component';
import { TransportsModalFormComponent } from './components/transports-modal-form/transports-modal-form.component';
import { TransportsModalNavbarComponent } from './components/transports-modal-navbar/transports-modal-navbar.component';
import { TransportsModalTableComponent } from './components/transports-modal-table/transports-modal-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransportsPageComponent,
    TransportsModalButtonComponent,
    TransportsModalFormComponent,
    TransportsModalNavbarComponent,
    TransportsModalTableComponent
  ],
  imports: [
    CommonModule,
    TransportsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class TransportsModule { }
