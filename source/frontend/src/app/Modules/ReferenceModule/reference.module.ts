import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ReferenceRoutingModule } from "./reference-routing.module";

import { AviaCompanyReferencesComponent } from "./components/aviaCompany/aviaCompany.component";
import { AviaCompanyPopupReferencesComponent } from "./components/aviaCompanyPopup/aviaCompanyPopup.component";

import { AirportReferencesComponent } from "./components/airport/airport.component";
import { AirportPopupReferencesComponent } from "./components/airportPopup/airportPopup.component";

import { CityReferencesComponent } from "./components/city/city.component";
import { CityPopupReferencesComponent } from "./components/cityPopup/cityPopup.component";

import { CounterpartiesContractReferencesComponent } from "./components/counterpartiesContract/counterpartiesContract.component";
import { CounterpartiesContractPopupReferencesComponent } from "./components/counterpartiesContractPopup/counterpartiesContractPopup.component";

import { CounterpartyReferencesComponent } from "./components/counterparty/counterparty.component";
import { CounterpartyPopupReferencesComponent } from "./components/counterpartyPopup/counterpartyPopup.component";

import { CuratorReferencesComponent } from "./components/curator/curator.component";
import { CuratorPopupReferencesComponent } from "./components/curatorPopup/curatorPopup.component";

import { NomenclatureReferencesComponent } from "./components/nomenclature/nomenclature.component";
import { NomenclaturePopupReferencesComponent } from "./components/nomenclaturePopup/nomenclaturePopup.component";

import { CurrencyExchangeReferencesComponent } from "./components/currencyExchange/currencyExchange.component";
import { CurrencyExchangePopupReferencesComponent } from "./components/currencyExchangePopup/currencyExchangePopup.component";

import { IndividualCounterpartiesReferencesComponent } from "./components/individualCounterparties/individualCounterparties.component";
import { IndividualCounterpartiesPopupReferencesComponent } from "./components/individualCounterpartiesPopup/individualCounterpartiesPopup.component";

import { ServiceReferencesComponent } from "./components/service/service.component";
import { ServicePopupReferencesComponent } from "./components/servicePopup/servicePopup.component";

import { SearchPopupReferencesComponent } from "./components/searchPopup/searchPopup.component";

// materials modules
import { MatTabsModule, MatNativeDateModule, MatAutocompleteModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatListModule } from "@angular/material/list";
import { AirportService, AviaCompanyService, CityService,
  RefCounterpartyService, CuratorService, CurrencyExchangeService,
         IndividualCounterpartyService, RefNomenclatureService, ServiceTypeService } from "./services";


// print components
// import { AviaPrintInvoicePopupComponent } from './../AviaModule/components/printInvoice/printInvoice.component';
// import { AviaPrintActPopupComponent } from './../AviaModule/components/printAct/printAct.component';
// import { AviaPrintScorePopupComponent } from './../AviaModule/components/printScore/printScore.component';
// import { AviaPrintScoreWithStampPopupComponent } from './../AviaModule/components/printScoreWithStamp/printScoreWithStamp.component';

@NgModule({
  declarations: [
    AviaCompanyReferencesComponent,
    AviaCompanyPopupReferencesComponent,
    AirportReferencesComponent,
    AirportPopupReferencesComponent,
    CityReferencesComponent,
    CityPopupReferencesComponent,
    CounterpartiesContractReferencesComponent,
    CounterpartiesContractPopupReferencesComponent,
    CounterpartyReferencesComponent,
    CounterpartyPopupReferencesComponent,
    CuratorReferencesComponent,
    CuratorPopupReferencesComponent,
    NomenclatureReferencesComponent,
    NomenclaturePopupReferencesComponent,
    CurrencyExchangeReferencesComponent,
    CurrencyExchangePopupReferencesComponent,
    IndividualCounterpartiesReferencesComponent,
    IndividualCounterpartiesPopupReferencesComponent,
    ServiceReferencesComponent,
    ServicePopupReferencesComponent,
    SearchPopupReferencesComponent

    // AviaPrintInvoicePopupComponent,
    // AviaPrintActPopupComponent,
    // AviaPrintScorePopupComponent,
    // AviaPrintScoreWithStampPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReferenceRoutingModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule
  ],
  entryComponents: [
    AviaCompanyPopupReferencesComponent,
    AirportPopupReferencesComponent,
    ServicePopupReferencesComponent,
    CounterpartiesContractPopupReferencesComponent,
    CounterpartyPopupReferencesComponent,
    CuratorPopupReferencesComponent,
    CityPopupReferencesComponent,
    NomenclaturePopupReferencesComponent,
    SearchPopupReferencesComponent,
    CurrencyExchangePopupReferencesComponent,
    IndividualCounterpartiesPopupReferencesComponent
  ],
  exports: [
    AviaCompanyReferencesComponent,
    AviaCompanyPopupReferencesComponent,
    AirportReferencesComponent,
    AirportPopupReferencesComponent,
    CityReferencesComponent,
    CityPopupReferencesComponent,
    CounterpartiesContractReferencesComponent,
    CounterpartiesContractPopupReferencesComponent,
    CounterpartyReferencesComponent,
    CounterpartyPopupReferencesComponent,
    CuratorReferencesComponent,
    CuratorPopupReferencesComponent,
    NomenclatureReferencesComponent,
    NomenclaturePopupReferencesComponent,
    CurrencyExchangeReferencesComponent,
    CurrencyExchangePopupReferencesComponent,
    IndividualCounterpartiesReferencesComponent,
    IndividualCounterpartiesPopupReferencesComponent,
    ServiceReferencesComponent,
    ServicePopupReferencesComponent,
    SearchPopupReferencesComponent,
    ReferenceRoutingModule,
    //RefCounterpartyService,
  ],
  providers: [
    RefCounterpartyService,
    RefNomenclatureService,
    AirportService,
    AviaCompanyService,
    CityService,
    
    CuratorService,
    CurrencyExchangeService,
    IndividualCounterpartyService,
    ServiceTypeService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: []
})
export class ReferenceModule {}
