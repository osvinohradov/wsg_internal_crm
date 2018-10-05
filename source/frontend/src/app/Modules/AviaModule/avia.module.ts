import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AviaService } from './services/avia.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// materials modules
import { MatTabsModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

import { AviaInvoiceComponent } from './components/invoice/invoice.component';
import { AviaGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';
import { AviaInvoicePopupComponent } from './components/invoicePopup/invoicePopup.component';

import { AviaGroupInvoicePopupComponent } from './components/groupInvoicePopup/groupInvoicePopup.component';

// import { AviaPrintInvoicePopupComponent } from './components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './components/printScoreWithStamp/printScoreWithStamp.component';

import { AviaRoutingModule } from './avia-routing.module';

@NgModule({
  declarations: [
    AviaInvoiceComponent,
    AviaGroupInvoiceComponent ,
    AviaGroupInvoicePopupComponent,
    AviaInvoicePopupComponent,
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AviaRoutingModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpModule,
    HttpClientModule,
    MatListModule
  ],
  entryComponents: [
    // AviaInvoiceComponent,
    AviaInvoicePopupComponent,
    AviaGroupInvoicePopupComponent,
    // // AviaGroupInvoiceComponent,
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent
  ],
  exports: [
    AviaInvoiceComponent,
    AviaInvoicePopupComponent,
    AviaGroupInvoicePopupComponent,
    // AviaGroupInvoiceComponent,
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent,
    AviaRoutingModule
  ],
  providers: [AviaService],
  bootstrap: []
})
export class AviaModule { }
