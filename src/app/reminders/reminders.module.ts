import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindersRoutingModule } from './reminders-routing.module';
import { RemindersPageComponent } from './pages/reminders-page/reminders-page.component';


@NgModule({
  declarations: [
    RemindersPageComponent
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule
  ]
})
export class RemindersModule { }
