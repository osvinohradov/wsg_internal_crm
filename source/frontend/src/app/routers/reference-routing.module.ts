import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AviaCompanyReferencesComponent } from '../components/reference/aviaCompany/aviaCompany.component';
import { AirportReferencesComponent } from '../components/reference/airport/airport.component';
import { CityReferencesComponent } from '../components/reference/city/city.component';
import { CounterpartiesContractReferencesComponent } from '../components/reference/counterpartiesContract/counterpartiesContract.component';
import { CounterpartyReferencesComponent } from '../components/reference/counterparty/counterparty.component';
import { CuratorReferencesComponent } from '../components/reference/curator/curator.component';
import { NomenclatureReferencesComponent } from '../components/reference/nomenclature/nomenclature.component';
import { CurrencyExchangeReferencesComponent } from '../components/reference/currencyExchange/currencyExchange.component';
import { IndividualCounterpartiesReferencesComponent } from '../components/reference/individualCounterparties/individualCounterparties.component';
import { ServiceReferencesComponent } from '../components/reference/service/service.component';

const routes: Routes = [
  {
    path: 'reference', children: [
      { path: 'avia-company', component: AviaCompanyReferencesComponent },
      { path: 'airport', component: AirportReferencesComponent },
      { path: 'city', component: CityReferencesComponent },
      { path: 'counterparties-contracts', component: CounterpartiesContractReferencesComponent },
      { path: 'counterparty', component: CounterpartyReferencesComponent },
      { path: 'curator', component: CuratorReferencesComponent },
      { path: 'nomenclature', component: NomenclatureReferencesComponent },
      { path: 'currency-exchange', component: CurrencyExchangeReferencesComponent },
      { path: 'individual-counterparties', component: IndividualCounterpartiesReferencesComponent },
      { path: 'service', component: ServiceReferencesComponent },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReferenceRoutingModule { } 
