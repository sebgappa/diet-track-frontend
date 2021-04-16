import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DiaryComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class DiaryModule { }
