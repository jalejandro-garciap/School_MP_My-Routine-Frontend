import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinesRoutingModule } from './lines-routing.module';
import { LinesPageComponent } from './pages/lines-page/lines-page.component';


@NgModule({
  declarations: [
    LinesPageComponent
  ],
  imports: [
    CommonModule,
    LinesRoutingModule
  ]
})
export class LinesModule { }
