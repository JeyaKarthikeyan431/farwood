import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrManagementRoutingModule } from './hr-management-routing.module';
import { HrManagementComponent } from './hr-management.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [HrManagementComponent, EmployeeProfileComponent],
  imports: [
    CommonModule,
    HrManagementRoutingModule,
    SharedModule
  ]
})
export class HrManagementModule { }
