import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AviaInvoiceComponent } from './components/invoice/invoice.component';
import { AviaGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';

const routes: Routes = [
  {
    path: 'avia', children: [
      { path: 'invoice', component: AviaInvoiceComponent },
      { path: 'groupinvoice', component: AviaGroupInvoiceComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AviaRoutingModule { } 
