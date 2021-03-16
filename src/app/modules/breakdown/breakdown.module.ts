import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreakdownRoutingModule } from './breakdown-routing.module';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [BreakdownComponent],
  imports: [
    CommonModule,
    BreakdownRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ChartsModule,
    FontAwesomeModule,
    RouterModule,
    ToastrModule
  ]
})
export class BreakdownModule { }
