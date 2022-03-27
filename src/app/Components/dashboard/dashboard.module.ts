import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialsModule } from 'src/app/shared/materials/materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

@NgModule({
  declarations: [DashboardComponent, CreateInvoiceComponent, InvoiceViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialsModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
