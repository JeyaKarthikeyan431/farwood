import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MomManagementComponent } from './mom-management/mom-management.component';

import { SalesManagementComponent } from './sales-management.component';

const routes: Routes = [{ path: 'leads', component: SalesManagementComponent },
{path:'lead/mom',component:MomManagementComponent},
{ path: '', redirectTo: 'leads', pathMatch: 'full' },
{ path: '**', redirectTo: 'leads', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
