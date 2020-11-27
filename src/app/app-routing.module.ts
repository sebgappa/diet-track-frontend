import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diary',
        loadChildren: () => import('./modules/diary/diary.module').then(mod => mod.DiaryModule)
      },
      {
        path: 'goals',
        loadChildren: () => import('./modules/goals/goals.module').then(mod => mod.GoalsModule)
      },
      {
        path: 'meals',
        loadChildren: () => import('./modules/meals/meals.module').then(mod => mod.MealsModule)
      },
      {
        path: '**',
        redirectTo: 'diary'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
