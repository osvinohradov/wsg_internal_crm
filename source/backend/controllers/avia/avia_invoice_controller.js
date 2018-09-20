import { Router } from 'express';
import { AviaHandler } from '../../views';

const router = Router();

router.route('/avia_invoice')
    .get(async (req, res) => {
        AviaHandler.AviaInvoiceView.get_avia_invoices(req, res);
    });

export { router };
