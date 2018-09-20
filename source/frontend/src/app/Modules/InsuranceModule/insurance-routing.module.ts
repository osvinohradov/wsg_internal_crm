import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsuranceInvoiceComponent } from './components/invoice/invoice.component';
import { InsuranceGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';

const routes: Routes = [
  {
    path: 'insurance', children: [
      { path: 'invoice', component: InsuranceInvoiceComponent },
      { path: 'groupinvoice', component: InsuranceGroupInvoiceComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { } 
