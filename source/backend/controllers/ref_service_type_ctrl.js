import { Router } from 'express';

import { ref_service_type_handler } from '../views';

const router = Router();

router.route('/ref/service_type/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       ref_service_type_handler.get_service_types_names(req, res);
    });

export { router };