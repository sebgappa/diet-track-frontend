import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DoughnutComponent } from './components/charts/doughnut/doughnut.component';

@NgModule({
  declarations: 
  [
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ChartsModule
  ],
  exports:
  [
    DoughnutComponent
  ]
})
export class SharedModule { }
