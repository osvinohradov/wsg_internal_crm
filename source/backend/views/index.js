import { AviaInvoiceView } from './avia';
 

import { AirportsView, AviaCompanyView,
        CityView, CounterpartyView, CuratorView,
        CurrencyExchangeView, IndividualCounterpartyView,
        NomenclatureView, ServiceTypeView } from './reference';

let AviaHandler = {
    AviaInvoiceView
}


let ReferenceHandler = {
    AirportsView,
    AviaCompanyView,
    CityView,
    CounterpartyView,
    CuratorView,
    CurrencyExchangeView,
    IndividualCounterpartyView,
    NomenclatureView,
    ServiceTypeView
}

export {
    AviaHandler,
    ReferenceHandler
}