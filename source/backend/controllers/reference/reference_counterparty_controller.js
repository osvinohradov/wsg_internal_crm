import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/counterparty')
    .get(async (req, res) => {
        ReferenceHandler.CounterpartyView.get_all_counterparties(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.CounterpartyView.create_counterparty(req, res);
    });

router.route('/references/counterparty/:id')
    .get(async (req, res) => {
        ReferenceHandler.CounterpartyView.get_counterparty_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.CounterpartyView.update_counterparty(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.CounterpartyView.remove_counterparty(req, res);
    });

router.route('/references/counterparty/count')
    .get(async (req, res) => {
        ReferenceHandler.CounterpartyView.get_counterparty_count(req, res);
    })

export { router };