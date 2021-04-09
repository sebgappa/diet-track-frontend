import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMealComponent } from '../meals/components/view-meal/view-meal.component';
import { HistoryComponent } from './components/food/components/history/history.component';
import { MyMealsComponent } from './components/food/components/my-meals/my-meals.component';
import { WholeComponent } from './components/food/components/whole/whole.component';
import { FoodComponent } from './components/food/food.component';

const routes: Routes = [{
  path: '',
  component: FoodComponent,
  children: [
    {
      path: 'history',
      component: HistoryComponent
    },
    {
      path: 'whole',
      component: WholeComponent
    },
    {
      path: 'mymeals',
      component: MyMealsComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
