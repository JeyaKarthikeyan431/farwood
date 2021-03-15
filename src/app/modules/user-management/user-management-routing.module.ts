import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { RolesComponent } from './roles/roles.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: 'create-user',
    component: UserManagementComponent,
    children: [
      {
        path: 'roles',
        component: RolesComponent,
      },
      { path: '', redirectTo: 'create-user', pathMatch: 'full' },
      { path: '**', redirectTo: 'create-user', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
