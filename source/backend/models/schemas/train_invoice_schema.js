let train_invoice_schema = {
    number: 0,
    date: null,
    payment_form: 'cash',
    payment_date: null,
    tickets_count: 0, 
    total_amount: 0,
    client_id: null,
    service_date: null,
    is_void: false,
    is_returned: false,
    is_paid: false,
    group_invoice_id: null,
    offer_currency_id: null,
    total_currency_id: null,
    provider_id: null, 
    taxes_payment: null, 
    curator_id: null,
    currency_exchange_id: null,
    service_type_id: null,
    checking_account_id: null,
    comment: '',
    responsible_agent_id: null,
    agent_id: null,
    is_processed: false,
    returned_document: '',
    detail_info: {
        train_number: '',
        carriage_number: '',
        place: '',
        service_type: '',
        arrival_dt: null,
        departure_dt: null,
        payment_provider_dt: null, 
        departure_station: '', 
        arrival_station: '',
        surname: '',
        ticket_number: '',

        supplier_cost: {
            sum: 0, 
            mpe: 0,
            currency_id: null
        },
        supplier_commision: {
            sum: 0,
            mpe: 0,
            percent: 0,
            currency_id: null
        },

        forfeit: {
            sum: 0,
            mpe: 0,
            currency_id: null
        },

        agency_services: {
            sum: 0,
            mpe: 0,
            percent: 0, 
            bank_percent: 0,
            currency_id: null
        },

        other_services: {
            sum: 0,
            mpe: 0,
            currency_id: null
        },

        total_amount: {
            sum: 0,
            mpe: 0,
            currency_id: null
        },

        additional_info: '',
        total_amount_ucop: 0,
        ucop_mpe: 0

    }
};


export {
    train_invoice_schema
}