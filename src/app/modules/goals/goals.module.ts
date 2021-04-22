import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsRoutingModule } from './goals-routing.module';
import { GoalsComponent } from './components/goals/goals.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CaloriesComponent } from './components/calories/calories.component';
import { MicrosComponent } from './components/micros/micros.component';
import { MacrosComponent } from './components/macros/macros.component';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    GoalsComponent,
    CaloriesComponent,
    MicrosComponent,
    MacrosComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    SharedModule,
    RouterModule,
    ToastrModule,
    ChartsModule,
    FontAwesomeModule
  ]
})
export class GoalsModule { }
