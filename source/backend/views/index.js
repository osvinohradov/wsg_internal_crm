import { AviaInvoiceView, AviaGroupInvoiceView } from './avia';
import { TrainInvoiceView, TrainGroupInvoiceView  } from './train';
import { TourismInvoiceView, TourismGroupInvoiceView } from './tourism';
import { InsuranceInvoiceView, InsuranceGroupInvoiceView } from './insurance';
import { AirportsView, AviaCompanyView,CityView,
        CounterpartyView, CuratorView, CurrencyExchangeView,
        IndividualCounterpartyView, NomenclatureView, ServiceTypeView } from './reference';

let AviaHandler = {
    AviaInvoiceView,
    AviaGroupInvoiceView
};

let TrainHandler = {
    TrainInvoiceView,
    TrainGroupInvoiceView
};

let TourismHandler = {
    TourismInvoiceView,
    TourismGroupInvoiceView
};

let InsuranceHandler = {
    InsuranceInvoiceView,
    InsuranceGroupInvoiceView
};

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
};

export {
    AviaHandler,
    TrainHandler,
    TourismHandler,
    InsuranceHandler,
    ReferenceHandler
}