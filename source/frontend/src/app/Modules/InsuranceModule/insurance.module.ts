import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InsuranceInvoiceComponent } from './components/invoice/invoice.component';
import { InsuranceGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';
import { InsuranceRoutingModule } from './insurance-routing.module';

@NgModule({
  declarations: [
    InsuranceInvoiceComponent,
    InsuranceGroupInvoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    InsuranceRoutingModule
  ],
  exports: [
    InsuranceInvoiceComponent,
    InsuranceGroupInvoiceComponent,
    InsuranceRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class InsuranceModule { } 
