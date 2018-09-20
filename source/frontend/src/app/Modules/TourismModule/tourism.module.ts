import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TourismInvoiceComponent } from './components/invoice/invoice.component';
import { TourismGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';
import { TourismRoutingModule } from './tourism-routing.module';

@NgModule({
  declarations: [
    TourismInvoiceComponent,
    TourismGroupInvoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TourismRoutingModule
  ],
  exports: [
    TourismInvoiceComponent,
    TourismGroupInvoiceComponent,
    TourismRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class TourismModule { } 
