import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diary',
        loadChildren: () => import('./modules/diary/diary.module').then(mod => mod.DiaryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'goals',
        loadChildren: () => import('./modules/goals/goals.module').then(mod => mod.GoalsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'meals',
        loadChildren: () => import('./modules/meals/meals.module').then(mod => mod.MealsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "**",
        component: WelcomeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
