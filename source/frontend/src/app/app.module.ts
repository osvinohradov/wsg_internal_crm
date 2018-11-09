import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AviaModule } from './Modules/AviaModule/avia.module';
import { TrainModule } from './Modules/TrainModule/train.module';
import { InsuranceModule } from './Modules/InsuranceModule/insurance.module';
import { TourismModule } from './Modules/TourismModule/tourism.module';
import { ReferenceModule } from './Modules/ReferenceModule/reference.module';

import { AviaPrintInvoicePopupComponent } from './Components/printInvoice/printInvoice.component';
import { AviaPrintActPopupComponent } from './Components/printAct/printAct.component';
import { AviaPrintScorePopupComponent } from './Components/printScore/printScore.component';
import { AviaPrintScoreWithStampPopupComponent } from './Components/printScoreWithStamp/printScoreWithStamp.component';



/* ********************** Start Customer Routing Modules Section ********************** */
import { AviaRoutingModule } from './routers/avia-routing.module';
/* ********************** End Customer Routing Modules Section ********************** */

/* ********************** Start Customer Components Section ********************** */
import { AviaInvoiceComponent } from './components/avia/avia.component';
/* ********************** End Customer Components Section ********************** */

const routes : Routes = []

@NgModule({
  declarations: [
    AppComponent,
    AviaInvoiceComponent,
    AviaPrintInvoicePopupComponent,
    AviaPrintActPopupComponent,
    AviaPrintScorePopupComponent,
    AviaPrintScoreWithStampPopupComponent
  ],
  imports: [
    AviaRoutingModule,
    FormsModule,
    BrowserModule,
    AviaModule,
    TrainModule,
    InsuranceModule,
    TourismModule,
    ReferenceModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  entryComponents: [
    AviaPrintInvoicePopupComponent,
    AviaPrintActPopupComponent,
    AviaPrintScorePopupComponent,
    AviaPrintScoreWithStampPopupComponent,
    AviaInvoiceComponent
  ],
  exports: [
    AviaRoutingModule,
    AviaPrintInvoicePopupComponent,
    AviaPrintActPopupComponent,
    AviaPrintScorePopupComponent,
    AviaPrintScoreWithStampPopupComponent,
    AviaInvoiceComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
