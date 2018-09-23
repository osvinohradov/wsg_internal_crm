import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AviaInvoiceComponent } from './Modules/AviaModule/components/invoice/invoice.component';

const routes: Routes = [
  {
    path: 'avia', children: [
      { path: 'invoice', component: AviaInvoiceComponent },
    ],
  
  },
  // {
  //   path: 'reference'
  // }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
