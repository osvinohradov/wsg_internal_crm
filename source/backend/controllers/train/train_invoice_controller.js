import { Router } from 'express';

import { TrainHandler } from '../../views';

const router = Router();

router.route('/train/invoice')
    // get all invoices
    .get(async (req, res) => {
        TrainHandler.TrainInvoiceView.get_all_train_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        TrainHandler.TrainInvoiceView.create_train_invoice(req, res);
    });

router.route('/train/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        TrainHandler.TrainInvoiceView.get_train_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        TrainHandler.TrainInvoiceView.update_train_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        TrainHandler.TrainInvoiceView.remove_train_invoice(req, res);
    });

router.route('/train/count/invoices')
    .get((req, res) => {
        TrainHandler.TrainInvoiceView.get_train_invoice_count(req, res);
    });

export { router };