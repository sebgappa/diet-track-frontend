import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    DiaryComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    FontAwesomeModule,
    ZXingScannerModule
  ]
})
export class DiaryModule { }
