import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
 
import { TrainInvoiceComponent } from './components/invoice/invoice.component'; 
import { TrainGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component'; 
 
const routes: Routes = [ 
  { 
    path: 'train', children: [ 
      { path: 'invoice', component: TrainInvoiceComponent }, 
      { path: 'groupinvoice', component: TrainGroupInvoiceComponent } 
    ] 
  } 
] 
 
@NgModule({ 
  imports: [ 
    RouterModule.forChild(routes) 
  ], 
  exports: [RouterModule] 
}) 
export class TrainRoutingModule { } 
