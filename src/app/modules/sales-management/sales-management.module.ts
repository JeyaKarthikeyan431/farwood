import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesManagementRoutingModule } from './sales-management-routing.module';
import { SalesManagementComponent } from './sales-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { BasicRequirementComponent } from './basic-requirement/basic-requirement.component';
import { PropertyInfoComponent } from './property-info/property-info.component';


@NgModule({
  declarations: [SalesManagementComponent, PersonalInfoComponent, BasicRequirementComponent, PropertyInfoComponent],
  imports: [
    CommonModule,
    SalesManagementRoutingModule,
    SharedModule
  ]
})
export class SalesManagementModule { }
