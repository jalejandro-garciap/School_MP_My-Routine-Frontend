import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesPageComponent } from './components/messages-page/messages-page.component';


@NgModule({
  declarations: [
    MessagesPageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
