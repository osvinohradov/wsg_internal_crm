import { avia_invoice_ctrl, avia_group_invoice_ctrl }  from './avia';
import { train_invoice_ctrl, train_group_invoice_ctrl } from './train';
import { tourism_group_invoice_ctrl, tourism_invoice_ctrl } from './tourism';
import { insurance_invoice_ctrl, insurance_group_invoice_ctrl } from './insurance';
import { reference_airport_ctrl, reference_avia_company_ctrl,
        reference_city_ctrl, reference_counterparty_ctrl,
        reference_curator_ctrl, reference_currency_exchange_ctrl,
        reference_individual_counterparty_ctrl, reference_nomenclature_ctrl,
        reference_service_type_ctrl } from './reference';

/**
 * 
 * @param {app} object
 * 
 * @returns {void} void
 */
function register_routes(app, base_route){
    // Avia routes section
    app.use(base_route, avia_invoice_ctrl);
    app.use(base_route, avia_group_invoice_ctrl);
    
    // Train routes section
    app.use(base_route, train_invoice_ctrl);
    app.use(base_route, train_group_invoice_ctrl);

    // Tourism routes section
    app.use(base_route, tourism_invoice_ctrl);
    app.use(base_route, tourism_group_invoice_ctrl);

    // Insurance routes section
    app.use(base_route, insurance_invoice_ctrl);
    app.use(base_route, insurance_group_invoice_ctrl);

    // References routes
    app.use(base_route, reference_airport_ctrl);
    app.use(base_route, reference_avia_company_ctrl);
    app.use(base_route, reference_city_ctrl);
    app.use(base_route, reference_counterparty_ctrl);
    app.use(base_route, reference_curator_ctrl);
    app.use(base_route, reference_currency_exchange_ctrl);
    app.use(base_route, reference_individual_counterparty_ctrl);
    app.use(base_route, reference_nomenclature_ctrl);
    app.use(base_route, reference_service_type_ctrl);
}

export {
    register_routes
}