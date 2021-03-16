import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DiaryComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    RouterModule
  ]
})
export class DiaryModule { }
