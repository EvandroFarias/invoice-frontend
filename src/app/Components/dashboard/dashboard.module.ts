import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialsModule } from 'src/app/shared/materials/materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateItemComponent } from './create-item/create-item.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

@NgModule({
  declarations: [DashboardComponent, CreateItemComponent, CreateInvoiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
