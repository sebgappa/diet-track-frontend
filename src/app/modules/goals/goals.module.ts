import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GoalsComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    SharedModule
  ]
})
export class GoalsModule { }
