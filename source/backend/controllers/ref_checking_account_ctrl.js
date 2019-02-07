import { Router } from 'express';

import { ref_checking_account_handler } from '../views';

const router = Router();

router.route('/ref/checking_accounts/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
       ref_checking_account_handler.get_checking_accounts_names(req, res);
    });

export { router };