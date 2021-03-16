import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    ScannerRoutingModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    ToastrModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule
  ]
})
export class ScannerModule { }
