import { Router } from 'express';

import { ref_unit_classifier_handler } from '../views';

const router = Router();

router.route('/ref/unit_classifiers/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       ref_unit_classifier_handler.get_unit_classifiers_names(req, res);
    });

export { router };