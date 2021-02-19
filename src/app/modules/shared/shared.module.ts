import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './components/charts/pie/pie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: 
  [
    PieComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:
  [
    PieComponent
  ]
})
export class SharedModule { }
