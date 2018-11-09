import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AviaInvoiceComponent } from '../components/avia/avia.component';

const routes: Routes = [
  {
    path: 'avia', children: [
      { path: 'invoice', component: AviaInvoiceComponent }
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
