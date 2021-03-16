import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakdownComponent } from './components/breakdown/breakdown.component';

const routes: Routes = [
  {
    path: '',
    component: BreakdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakdownRoutingModule { }
