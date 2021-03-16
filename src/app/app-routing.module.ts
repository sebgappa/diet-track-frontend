import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DeviceGuard } from './guard/device.guard';
import { FoodComponent } from './modules/food/components/food/food.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diary',
        loadChildren: () => import('./modules/diary/diary.module').then(mod => mod.DiaryModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'goals',
        loadChildren: () => import('./modules/goals/goals.module').then(mod => mod.GoalsModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'meals',
        loadChildren: () => import('./modules/meals/meals.module').then(mod => mod.MealsModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'food/:meal',
        loadChildren: () => import('./modules/food/food.module').then(mod => mod.FoodModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'breakdown/:id',
        loadChildren: () => import('./modules/breakdown/breakdown.module').then(mod => mod.BreakdownModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'scan',
        loadChildren: () => import('./modules/scanner/scanner.module').then(mod => mod.ScannerModule),
        canActivate: [AuthGuard, DeviceGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
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
