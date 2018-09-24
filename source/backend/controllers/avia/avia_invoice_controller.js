import { Router } from 'express';

import { AviaHandler } from '../../views';

const router = Router();

router.route('/avia/invoice')
    // get all invoices
    .get(async (req, res) => {
        AviaHandler.AviaInvoiceView.get_all_avia_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        AviaHandler.AviaInvoiceView.create_avia_invoice(req, res);
    });

router.route('/avia/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        AviaHandler.AviaInvoiceView.get_avia_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        AviaHandler.AviaInvoiceView.update_avia_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        AviaHandler.AviaInvoiceView.remove_avia_invoice(req, res);
    });

router.route('/avia/count/invoices')
    .get((req, res) => {
        AviaHandler.AviaInvoiceView.get_avia_invoice_count(req, res);
    });

export { router };