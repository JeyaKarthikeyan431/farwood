import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesManagementRoutingModule } from './sales-management-routing.module';
import { SalesManagementComponent } from './sales-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { BasicRequirementComponent } from './basic-requirement/basic-requirement.component';
import { PropertyInfoComponent } from './property-info/property-info.component';
import { MomManagementComponent } from './mom-management/mom-management.component';
import { CreateMomComponent } from './create-mom/create-mom.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { DesignRequirementComponent } from './design-requirement/design-requirement.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MomActionComponent } from './mom-action/mom-action.component';
import { MomViewComponent } from './mom-view/mom-view.component';

@NgModule({
  declarations: [SalesManagementComponent, PersonalInfoComponent, BasicRequirementComponent, PropertyInfoComponent, MomManagementComponent, CreateMomComponent, ViewDetailsComponent, DesignRequirementComponent, MomActionComponent, MomViewComponent],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }],
  imports: [
    CommonModule,
    SalesManagementRoutingModule,
    SharedModule
  ]
})
export class SalesManagementModule { }
