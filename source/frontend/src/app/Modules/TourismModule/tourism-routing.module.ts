import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourismInvoiceComponent } from './components/invoice/invoice.component';
import { TourismGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';

const routes: Routes = [
  {
    path: 'tourism', children: [
      { path: 'invoice', component: TourismInvoiceComponent },
      { path: 'groupinvoice', component: TourismGroupInvoiceComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TourismRoutingModule { } 
