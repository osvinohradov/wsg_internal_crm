import { train_ctrl, 
         group_invoice_ctrl, 
         user_ctrl,
         organization_ctrl,

         References,
         ref } from '../controllers';

/**
 * 
 * @param {app} object
 * 
 * @returns {void} void
 */
export function register_routes(app, base_route){
    // Invoices
    app.use(base_route, train_ctrl);
    app.use(base_route, group_invoice_ctrl);

    // Services
    app.use(base_route, user_ctrl);
    app.use(base_route, organization_ctrl);

    // References
    app.use(base_route, ref.ref_unit_classifier_ctrl);
    app.use(base_route, ref.ref_checking_account_ctrl);
    app.use(base_route, ref.ref_individual_counterparty_ctrl);
    app.use(base_route, ref.ref_railway_station_ctrl);





    app.use(base_route, References.AirportsRoute);
    app.use(base_route, References.AviaCompanyRoute);
    app.use(base_route, References.ServiceTypeRoute);
    app.use(base_route, References.CounterpartyContractRoute);
    app.use(base_route, References.CounterpartyRoute);
    app.use(base_route, References.CounterpartyGroupRoute);
    app.use(base_route, References.CuratorRoute);
}