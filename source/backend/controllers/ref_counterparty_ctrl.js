import { Router } from 'express';

import { ref_counterparty_handler } from '../views';

const router = Router();

router.route('/ref/counterparties/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       ref_counterparty_handler.get_counterparties_names(req, res);
    });

export { router };