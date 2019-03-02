
import train_handler from './train_view';
import group_invoice_handler from './group_invoice_view';


// Sevices
import user_handler from './user_view';
import organization_handler from './organizations_view';


// References
import ref_counterparty_handler from './ref_counterparty_view';
import ref_curator_handler from './ref_curator_view';
import ref_unit_classifier_handler from './ref_unit_classifier_view';
import ref_checking_account_handler from './ref_checking_account_view';
import ref_individual_counterparty_handler from './ref_individual_counterparty_view';
import ref_service_type_handler from './ref_service_type_view';
import ref_railway_station_handler from './ref_railway_station';


import * as References from './references';

export {
    train_handler,
    group_invoice_handler,

    // Services
    user_handler,
    organization_handler,

    // References
    ref_counterparty_handler,
    ref_curator_handler,
    ref_unit_classifier_handler,
    ref_checking_account_handler,
    ref_individual_counterparty_handler,
    ref_service_type_handler,
    ref_railway_station_handler,

    References
}