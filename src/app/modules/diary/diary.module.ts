import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiaryComponent,
    ScannerComponent,
    BreakdownComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FontAwesomeModule,
    ZXingScannerModule,
    ToastrModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DiaryModule { }
