import { Router } from 'express';

import { TourismHandler } from '../../views';

const router = Router();

router.route('/tourism/group/invoice')
    // get all invoices
    .get(async (req, res) => {
        TourismHandler.TourismGroupInvoiceView.get_all_tourism_group_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        TourismHandler.TourismGroupInvoiceView.create_tourism_group_invoice(req, res);
    });

router.route('/tourism/group/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        TourismHandler.TourismGroupInvoiceView.get_tourism_group_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        TourismHandler.TourismGroupInvoiceView.update_tourism_group_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        TourismHandler.TourismGroupInvoiceView.remove_tourism_group_invoice(req, res);
    });

router.route('/tourism/group/count/invoices')
    .get((req, res) => {
        TourismHandler.TourismGroupInvoiceView.get_tourism_group_invoice_count(req, res);
    });

export { router };