import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { DiaryComponent } from './components/diary/diary.component';
import { FoodComponent } from './components/food/food.component';
import { ScannerComponent } from './components/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    component: DiaryComponent
  },
  {
    path: 'scan',
    component: ScannerComponent
  },
  {
    path: 'breakdown/:id',
    component: BreakdownComponent
  },
  {
    path: 'food',
    component: FoodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
