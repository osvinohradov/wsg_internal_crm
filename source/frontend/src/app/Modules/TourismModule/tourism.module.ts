import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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

import { TourismInvoiceComponent } from './components/invoice/invoice.component';
import { TourismGroupInvoiceComponent } from './components/groupInvoice/groupInvoice.component';
import { TourismRoutingModule } from './tourism-routing.module';
import { TourismService } from './services';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TourismInvoiceDialogComponent } from './components/invoice_popup/invoice_popup.component';

@NgModule({
  declarations: [
    TourismInvoiceComponent,
    TourismInvoiceDialogComponent,
    TourismGroupInvoiceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    TourismRoutingModule,
    ToastrModule.forRoot(),
    //GroupInvoiceModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    TourismRoutingModule,
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
  exports: [
    TourismInvoiceComponent,
    TourismGroupInvoiceComponent,
    TourismRoutingModule
  ],
  entryComponents: [
    TourismInvoiceDialogComponent
  ],
  providers: [
    TourismService
  ],
  bootstrap: []
})
export class TourismModule { } 
