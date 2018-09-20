import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrainInvoiceComponent } from './components/invoice/invoice.component';
import { TrainGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';
import { TrainRoutingModule } from './train-routing.module';

@NgModule({
  declarations: [
    TrainInvoiceComponent,
    TrainGroupInvoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TrainRoutingModule
  ],
  exports: [
    TrainInvoiceComponent,
    TrainGroupInvoiceComponent,
    TrainRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TrainModule { } 
