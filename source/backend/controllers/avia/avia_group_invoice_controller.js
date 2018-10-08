import { Router } from 'express';

import { AviaHandler } from '../../views';

const router = Router();

router.route('/avia/group/invoice')
    // get all invoices
    .get(async (req, res) => {
        AviaHandler.AviaGroupInvoiceView.get_all_avia_group_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        AviaHandler.AviaGroupInvoiceView.create_avia_group_invoice(req, res);
    });

router.route('/avia/group/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        AviaHandler.AviaGroupInvoiceView.get_avia_group_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        AviaHandler.AviaGroupInvoiceView.update_avia_group_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        AviaHandler.AviaGroupInvoiceView.remove_avia_group_invoice(req, res);
    });

router.route('/avia/group/count/invoices')
    .get((req, res) => {
        AviaHandler.AviaGroupInvoiceView.get_avia_group_invoice_count(req, res);
    });


router.route('/avia/group/search/invoices')
    .get((req, res) => {
        AviaHandler.AviaGroupInvoiceView.get_avia_group_invoice_content(req, res);
    });

export { router };