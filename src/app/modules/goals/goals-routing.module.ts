import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaloriesComponent } from './components/calories/calories.component';
import { GoalsComponent } from './components/goals/goals.component';
import { MacrosComponent } from './components/macros/macros.component';
import { MicrosComponent } from './components/micros/micros.component';


const routes: Routes = [  {
  path: '',
  component: GoalsComponent,
  children: [
    {
      path: 'calories',
      component: CaloriesComponent
    },
    {
      path: 'micros',
      component: MicrosComponent
    },
    {
      path: 'macros',
      component: MacrosComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
