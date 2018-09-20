import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/individual_counterparty')
    .get(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.get_all_individual_counterparties(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.create_individual_counterparty(req, res);
    });

router.route('/references/individual_counterparty/:id')
    .get(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.get_individual_counterparty_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.update_individual_counterparty(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.remove_individual_counterparty(req, res);
    });

router.route('/references/individual_counterparty/count')
    .get(async (req, res) => {
        ReferenceHandler.IndividualCounterpartyView.get_individual_counterparty_count(req, res);
    })

export { router };