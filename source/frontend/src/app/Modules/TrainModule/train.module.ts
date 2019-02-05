import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TrainInvoiceComponent } from './components/invoice/invoice.component';
import { TrainRoutingModule } from './train-routing.module';

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



import { TrainService } from './services';
import { TrainInvoiceDialogComponent } from './components/invoice_popup/invoice_popup.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TrainInvoiceComponent,
    TrainInvoiceDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    TrainRoutingModule,
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
    TrainInvoiceDialogComponent
  ],
  exports: [
    TrainInvoiceComponent,
    TrainRoutingModule
  ],
  providers: [TrainService],
  bootstrap: []
})
export class TrainModule { } 
