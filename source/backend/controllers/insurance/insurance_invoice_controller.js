import { Router } from 'express';

import { InsuranceHandler } from '../../views';

const router = Router();

router.route('/insurance/invoice')
    // get all invoices
    .get(async (req, res) => {
        InsuranceHandler.InsuranceInvoiceView.get_all_insurance_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        InsuranceHandler.InsuranceInvoiceView.create_insurance_invoice(req, res);
    });

router.route('/insurance/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        InsuranceHandler.InsuranceInvoiceView.get_insurance_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        InsuranceHandler.InsuranceInvoiceView.update_insurance_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        InsuranceHandler.InsuranceInvoiceView.remove_insurance_invoice(req, res);
    });

router.route('/insurance/count/invoices')
    .get((req, res) => {
        InsuranceHandler.InsuranceInvoiceView.get_insurance_invoice_count(req, res);
    });

export { router };