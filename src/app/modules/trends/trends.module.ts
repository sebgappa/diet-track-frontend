import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendsRoutingModule } from './trends-routing.module';
import { TrendsComponent } from './components/trends/trends.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [TrendsComponent],
  imports: [
    CommonModule,
    TrendsRoutingModule,
    ChartsModule
  ]
})
export class TrendsModule { }
