import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/avia_company')
    .get(async (req, res) => {
        ReferenceHandler.AviaCompanyView.get_all_avia_companies(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.AviaCompanyView.create_avia_company(req, res);
    });

router.route('/references/avia_company/:id')
    .get(async (req, res) => {
        ReferenceHandler.AviaCompanyView.get_avia_company_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.AviaCompanyView.update_avia_company(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.AviaCompanyView.remove_avia_company(req, res);
    });

router.route('/references/avia_company/count')
    .get(async (req, res) => {
        ReferenceHandler.AviaCompanyView.get_avia_company_count(req, res);
    })

export { router };