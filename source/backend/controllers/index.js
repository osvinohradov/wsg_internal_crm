import { router as train_ctrl } from './train_ctrl';
import { router as group_invoice_ctrl} from './group_invoice_ctrl';

//Services
import { router as user_ctrl } from './user_ctrl';
import { router as organization_ctrl } from './organization_ctrl';

// References
import { router as ref_counterparty_ctrl } from './ref_counterparty_ctrl';
import { router as ref_curator_ctrl } from './ref_curator_ctrl';
import { router as ref_unit_classifier_ctrl } from './ref_unit_classifier_ctrl';
import { router as ref_checking_account_ctrl } from './ref_checking_account_ctrl';
import { router as ref_individual_counterparty_ctrl } from './ref_individual_counterparty_ctrl';
import { router as ref_service_type_ctrl } from './ref_service_type_ctrl';
import { router as ref_railway_station_ctrl } from './ref_railway_station_ctrl';

import * as References from './references';

const ref = {
    ref_counterparty_ctrl,
    ref_curator_ctrl,
    ref_unit_classifier_ctrl,
    ref_checking_account_ctrl,
    ref_individual_counterparty_ctrl,
    ref_service_type_ctrl,
    ref_railway_station_ctrl
}

export {
    References,
    train_ctrl,
    group_invoice_ctrl,

    // Services
    user_ctrl,
    organization_ctrl,

    // References
    ref
}