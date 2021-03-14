import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'user',
     //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },
  { path: 'hr-management', loadChildren: () => import('./modules/hr-management/hr-management.module').then(m => m.HrManagementModule) },
  {
    path: '',
    redirectTo:'/auth/login',
    pathMatch: 'full',
  },
  { path: 'sales-management', loadChildren: () => import('./modules/sales-management/sales-management.module').then(m => m.SalesManagementModule) },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
