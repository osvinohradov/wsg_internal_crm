import { Router } from 'express';
import { AviaHandler } from '../../views';

const router = Router();

router.route('/avia_invoice')
    .get(async (req, res) => {
        AviaHandler.AviaGroupInvoiceView.get_all_avia_group_invoices(req, res);
    });

export { router };
1