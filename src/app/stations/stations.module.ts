import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { StationsPageComponent } from './pages/stations-page/stations-page.component';


@NgModule({
  declarations: [
    StationsPageComponent
  ],
  imports: [
    CommonModule,
    StationsRoutingModule
  ]
})
export class StationsModule { }
