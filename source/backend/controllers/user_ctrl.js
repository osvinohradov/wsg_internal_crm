import { Router } from 'express';

import { user_handler } from '../views';

const router = Router();

router.route('/users/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       user_handler.get_users_names(req, res);
    });

export { router };