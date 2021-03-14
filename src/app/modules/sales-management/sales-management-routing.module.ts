import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicRequirementComponent } from './basic-requirement/basic-requirement.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PropertyInfoComponent } from './property-info/property-info.component';

import { SalesManagementComponent } from './sales-management.component';

const routes: Routes = [{ path: 'leads', component: SalesManagementComponent },
{ path: 'add', component: PersonalInfoComponent },
{ path: 'basic', component: BasicRequirementComponent },
{path:'property',component:PropertyInfoComponent},
{ path: '', redirectTo: 'leads', pathMatch: 'full' },
{ path: '**', redirectTo: 'leads', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
