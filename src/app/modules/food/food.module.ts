import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './components/food/food.component';
import { HistoryComponent } from './components/food/components/history/history.component';
import { WholeComponent } from './components/food/components/whole/whole.component';
import { WholeListComponent } from './components/food/components/whole/components/whole-list/whole-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MyMealsComponent } from './components/food/components/my-meals/my-meals.component';


@NgModule({
  declarations: [FoodComponent, HistoryComponent, WholeComponent, WholeListComponent, MyMealsComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    CommonModule,
    FontAwesomeModule,
    ToastrModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HistoryComponent,
    WholeComponent,
    MyMealsComponent,
    WholeListComponent
  ]
})
export class FoodModule { }
