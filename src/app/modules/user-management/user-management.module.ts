import { NgModule } from '@angular/core';
import { RolesComponent } from './roles/roles.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [RolesComponent, UserManagementComponent, CreateUserComponent],
  imports: [
    UserManagementRoutingModule,
    CommonModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class UserManagementModule {}
