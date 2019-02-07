import { Router } from 'express';

import { group_invoice_handler } from '../views';

const router = Router();

router.route('/group/invoices/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        group_invoice_handler.get_group_invoices_names(req, res);
    });

export { router };