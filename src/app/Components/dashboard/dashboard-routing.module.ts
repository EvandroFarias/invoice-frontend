import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'createinvoice',
    component: CreateInvoiceComponent,
  },
 {
   path: 'invoice/:id',
   component: InvoiceViewComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
