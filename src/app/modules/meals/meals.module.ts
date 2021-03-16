import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsComponent } from './components/meals/meals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { ViewMealComponent } from './components/view-meal/view-meal.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FoodModule } from '../food/food.module';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    MealsComponent,
    AddMealComponent,
    ViewMealComponent
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule,
    ChartsModule,
    FoodModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class MealsModule { }
