import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
 
import { TrainInvoiceComponent } from './components/invoice/invoice.component';  
 
const routes: Routes = [ 
  { 
    path: 'train', children: [ 
      { path: 'invoice', component: TrainInvoiceComponent }
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
