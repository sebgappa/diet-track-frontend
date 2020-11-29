import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryComponent } from './components/diary/diary.component';
import { ScannerComponent } from './components/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    component: DiaryComponent
  },
  {
    path: 'scan',
    component: ScannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
