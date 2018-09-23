import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/currency_exchange')
    .get(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.get_all_currency_exchange(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.create_currency_exchange(req, res);
    });

router.route('/references/currency_exchange/:id')
    .get(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.get_currency_exchange_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.update_currency_exchange(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.remove_currency_exchange(req, res);
    });

router.route('/references/count.currency_exchange')
    .get(async (req, res) => {
        ReferenceHandler.CurrencyExchangeView.get_currency_exchange_count(req, res);
    })

export { router };