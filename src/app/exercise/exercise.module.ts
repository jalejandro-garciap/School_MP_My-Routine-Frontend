import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExercisePageComponent } from './pages/exercise-page/exercise-page.component';


@NgModule({
  declarations: [
    ExercisePageComponent
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
