import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DesktopGuard } from './guard/desktop.guard';
import { MobileGuard } from './guard/mobile.guard';
import { TrendsComponent } from './modules/trends/components/trends/trends.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diary',
        loadChildren: () => import('./modules/diary/diary.module').then(mod => mod.DiaryModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'goals',
        loadChildren: () => import('./modules/goals/goals.module').then(mod => mod.GoalsModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'meals',
        loadChildren: () => import('./modules/meals/meals.module').then(mod => mod.MealsModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'food/:meal',
        loadChildren: () => import('./modules/food/food.module').then(mod => mod.FoodModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'breakdown/:meal/:id',
        loadChildren: () => import('./modules/breakdown/breakdown.module').then(mod => mod.BreakdownModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'scan/:meal',
        loadChildren: () => import('./modules/scanner/scanner.module').then(mod => mod.ScannerModule),
        canActivate: [AuthGuard, MobileGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'trends',
        loadChildren: () => import('./modules/trends/trends.module').then(mod => mod.TrendsModule),
        canActivate: [AuthGuard, DesktopGuard]
      },
      {
        path: '**',
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
