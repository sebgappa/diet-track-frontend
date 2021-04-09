import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { MealsComponent } from './components/meals/meals.component';
import { ViewMealComponent } from './components/view-meal/view-meal.component';


const routes: Routes = [  {
  path: '',
  component: MealsComponent
},
{
  path: 'add',
  component: AddMealComponent
},
{
  path: 'view/:id',
  component: ViewMealComponent
},
{
  path: 'add/:meal/:id',
  component: ViewMealComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule { }
