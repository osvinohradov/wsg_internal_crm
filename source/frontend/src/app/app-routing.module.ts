import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AviaInvoiceComponent } from './Modules/AviaModule/components/invoice/invoice.component';
import { TrainInvoiceComponent } from './Modules/TrainModule/components/invoice/invoice.component';

const routes: Routes = [
  { path: 'avia', component: AviaInvoiceComponent },
  { path: 'train', component: TrainInvoiceComponent },
  
  {  path: '**', component: AppComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
