import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
// import { AviaModule } from './Modules/AviaModule/avia.module';
// import { TrainModule } from './Modules/TrainModule/train.module';
// import { InsuranceModule } from './Modules/InsuranceModule/insurance.module';
// import { TourismModule } from './Modules/TourismModule/tourism.module';
// import { ReferenceModule } from './Modules/ReferenceModule/reference.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// import { AviaPrintInvoicePopupComponent } from './Components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './Components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './Components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './Components/printScoreWithStamp/printScoreWithStamp.component';

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



/* ********************** Start Customer Routing Modules Section ********************** */
import { AviaRoutingModule } from './routers/avia-routing.module';
import { GroupInvoiceRoutingModule } from './routers/group_invoice-routing.module';
/* ********************** End Customer Routing Modules Section ********************** */

/* ********************** Start Customer Components Section ********************** */
import { AviaInvoiceComponent } from './components/avia/avia.component';
import { GroupInvoiceComponent } from './components/group_invoice/group_invoice.component';
import { AviaInvoiceService } from './services/avia/avia_invoice.service';

/* ********************** End Customer Components Section ********************** */

const routes : Routes = []

@NgModule({
  declarations: [
    AppComponent,
    AviaInvoiceComponent,
    GroupInvoiceComponent,
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent
  ],
  imports: [
    // ************
    AviaRoutingModule,
    GroupInvoiceRoutingModule,
    // ************
    FormsModule,
    BrowserModule,
    // AviaModule,
    // TrainModule,
    // InsuranceModule,
    // TourismModule,
    // ReferenceModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent,
    AviaInvoiceComponent,
    GroupInvoiceComponent
  ],
  exports: [
    AviaRoutingModule,
    GroupInvoiceRoutingModule,
    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent,
    AviaInvoiceComponent
  ],
  providers: [AviaInvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
