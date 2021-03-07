import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

import { HrManagementComponent } from './hr-management.component';


const routes: Routes = [
  {
    path: '',
    component: HrManagementComponent,
    children: [
      {
        path: 'employee-profile',
        component: EmployeeProfileComponent,
      },
      { path: '', redirectTo: 'employee-profile', pathMatch: 'full' },
      { path: '**', redirectTo: 'employee-profile', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrManagementRoutingModule { }
