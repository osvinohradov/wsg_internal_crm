import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupInvoiceComponent } from '../components/group_invoice/group_invoice.component';

const routes: Routes = [
  {
    path: 'group', children: [
      { path: 'invoices', component: GroupInvoiceComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupInvoiceRoutingModule { } 
