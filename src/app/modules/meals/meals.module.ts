import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './components/meals/meals.component';


@NgModule({
  declarations: [
    MealsComponent
  ],
  imports: [
    CommonModule,
    MealsRoutingModule
  ]
})
export class MealsModule { }
