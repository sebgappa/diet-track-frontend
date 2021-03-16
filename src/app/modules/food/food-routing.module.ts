import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './components/food/components/history/history.component';
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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }