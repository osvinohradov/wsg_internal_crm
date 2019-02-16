import { Router } from 'express';

import { group_invoice_handler } from '../views';

const router = Router();

router.route('/ref/currency_exchanges/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       
    });

export { router };