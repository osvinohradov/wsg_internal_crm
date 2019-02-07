import { Router } from 'express';

import { organization_handler } from '../views';

const router = Router();

router.route('/organizations/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       organization_handler.get_organizations_names(req, res);
    });

export { router };