import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportsRoutingModule } from './transports-routing.module';
import { TransportsPageComponent } from './pages/transports-page/transports-page.component';


@NgModule({
  declarations: [
    TransportsPageComponent
  ],
  imports: [
    CommonModule,
    TransportsRoutingModule
  ]
})
export class TransportsModule { }
