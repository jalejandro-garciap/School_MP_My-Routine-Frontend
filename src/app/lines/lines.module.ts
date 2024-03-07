import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinesRoutingModule } from './lines-routing.module';
import { LinesPageComponent } from './pages/lines-page/lines-page.component';
import { LineModalButtonComponent } from './components/line-modal-button/line-modal-button.component';
import { LineModalFormComponent } from './components/line-modal-form/line-modal-form.component';
import { LineNavbarComponent } from './components/line-navbar/line-navbar.component';
import { LineTableComponent } from './components/line-table/line-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LinesPageComponent,
    LineModalButtonComponent,
    LineModalFormComponent,
    LineNavbarComponent,
    LineTableComponent
  ],
  imports: [
    CommonModule,
    LinesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ]
})
export class LinesModule { }
