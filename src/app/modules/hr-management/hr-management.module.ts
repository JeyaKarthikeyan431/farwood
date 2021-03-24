import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrManagementRoutingModule } from './hr-management-routing.module';
import { HrManagementComponent } from './hr-management.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Alphabet,CapitalizeFirstDirective, MaskDirective, NumberDirective } from 'src/app/shared/custom-validation/custom.directive';


@NgModule({
  declarations: [HrManagementComponent, EmployeeProfileComponent, NumberDirective, Alphabet, MaskDirective, CapitalizeFirstDirective],
  imports: [
    CommonModule,
    HrManagementRoutingModule,
    SharedModule
  ]
})
export class HrManagementModule { }
