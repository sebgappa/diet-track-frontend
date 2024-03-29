import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './components/diary/diary.component';

const routes: Routes = [
  {
    path: '',
    component: DiaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
