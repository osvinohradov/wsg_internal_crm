import { Router } from 'express';

import { TourismHandler } from '../../views';

const router = Router();

router.route('/tourism/invoice')
    // get all invoices
    .get(async (req, res) => {
        TourismHandler.TourismInvoiceView.get_all_tourism_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        TourismHandler.TourismInvoiceView.create_tourism_invoice(req, res);
    });

router.route('/tourism/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        TourismHandler.TourismInvoiceView.get_tourism_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        TourismHandler.TourismInvoiceView.update_tourism_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        TourismHandler.TourismInvoiceView.remove_tourism_invoice(req, res);
    });

router.route('/tourism/count/invoices')
    .get((req, res) => {
        TourismHandler.TourismInvoiceView.get_tourism_invoice_count(req, res);
    });

export { router };