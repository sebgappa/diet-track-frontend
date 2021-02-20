import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './components/charts/pie/pie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: 
  [
    PieComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ChartsModule
  ],
  exports:
  [
    PieComponent
  ]
})
export class SharedModule { }
