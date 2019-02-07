import { Router } from 'express';

import { ref_individual_counterparty_handler } from '../views';

const router = Router();

router.route('/ref/individual_counterparties/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        ref_individual_counterparty_handler.get_individual_counterparties_names(req, res);
    });

export { router };