import { Router } from 'express';

import { train_handler } from '../views';

const router = Router();

router.route('/train/invoices')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        train_handler.get_train_invoices(req, res);
    })

router.route(`/train/invoice`)
    // Створити новий рахунок
    .post(async (req, res) => {
        train_handler.create_train_invoice(req, res);
    })
    .put(async (req, res) => {
        train_handler.update_train_invoice(req, res);
    })

router.route(`/train/invoice/:id`)
    // Отримати рахунок по id
    .get(async (req, res) => {
        train_handler.get_train_invoice_by_id(req, res);
    })
    // Оновити ыснуючий рахунок по id
    .put(async (req, res) => {
        train_handler.update_train_invoice(req, res);
    })
    // Видалити ыснуючий рахунок по id
    .delete(async (req, res) => {
        train_handler.delete_train_invoice(req, res);
    });

router.route(`/train/count/invoices`)
    // Отримати загальну кількість рахунків у базі.
    .get((req, res) => {
        // TrainHandler.TrainInvoiceView.get_train_invoice_count(req, res);
    });

router.route(`/print/train/act/:invoice_id`)
    .get((req, res) => {
        train_handler.print_act_document(req, res);
    });
router.route(`/print/train/invoice/:invoice_id`)
    .get((req, res) => {
        train_handler.print_invoice_document(req, res);
    });

export { router };