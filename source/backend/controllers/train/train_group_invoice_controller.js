import { Router } from 'express';

import { TrainHandler } from '../../views';

const router = Router();

router.route('/train/group/invoice')
    // get all invoices
    .get(async (req, res) => {
        TrainHandler.TrainGroupInvoiceView.get_all_train_group_invoices(req, res);
    })
    // create new invoice
    .post(async (req, res) => {
        TrainHandler.TrainGroupInvoiceView.create_train_group_invoice(req, res);
    });

router.route('/train/group/invoice/:id')
    // get invoice by id
    .get((req, res) => {
        TrainHandler.TrainGroupInvoiceView.get_train_group_invoice_by_id(req, res);
    })
    // update invoice by id
    .put((req, res) => {
        TrainHandler.TrainGroupInvoiceView.update_train_group_invoice(req, res);
    })
    // remove invoice by id
    .delete((req, res) => {
        TrainHandler.TrainGroupInvoiceView.remove_train_group_invoice(req, res);
    });

router.route('/train/group/count/invoices')
    .get((req, res) => {
        TrainHandler.TrainGroupInvoiceView.get_train_group_invoice_count(req, res);
    });

export { router };