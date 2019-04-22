import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
 
import { TrainInvoiceComponent } from './components/invoice/invoice.component';
import { TrainInvoiceDialogComponent } from './components/invoice_popup/invoice_popup.component';
 
const routes: Routes = [ 
  { 
    path: 'train', children: [ 
      { path: 'invoice', component: TrainInvoiceComponent },
      { path: 'invoice/:id', component: TrainInvoiceDialogComponent }
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
