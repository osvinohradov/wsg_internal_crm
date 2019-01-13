import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrainInvoiceComponent } from './components/invoice/invoice.component';
import { TrainRoutingModule } from './train-routing.module';

@NgModule({
  declarations: [
    TrainInvoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TrainRoutingModule
  ],
  exports: [
    TrainInvoiceComponent,
    TrainRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TrainModule { } 
