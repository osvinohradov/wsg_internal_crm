import { Router } from 'express';

import { InsuranceHandler } from '../../views';

const router = Router();

router.route('/insurance/invoice')
    // get all invoices
    .get(async (req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.get_all_insurance_group_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.create_insurance_group_invoice(req, res);
    });

router.route('/insurance/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.get_insurance_group_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.update_insurance_group_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.remove_insurance_group_invoice(req, res);
    });

router.route('/insurance/count/invoices')
    .get((req, res) => {
        InsuranceHandler.InsuranceGroupInvoiceView.get_insurance_group_invoice_count(req, res);
    });

export { router };