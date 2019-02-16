import { Router } from 'express';

import { ref_curator_handler } from '../views';

const router = Router();

router.route('/ref/curators/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       ref_curator_handler.get_curators_names(req, res);
    });

export { router };