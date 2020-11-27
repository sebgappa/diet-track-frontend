import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScannerComponent } from './scanner/scanner.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';


@NgModule({
  declarations: [
    DiaryComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FontAwesomeModule,
    BarcodeScannerLivestreamModule
  ]
})
export class DiaryModule { }
