import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/service_type')
    .get(async (req, res) => {
        ReferenceHandler.ServiceTypeView.get_all_service_type(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.ServiceTypeView.create_service_type(req, res);
    });

router.route('/references/service_type/:id')
    .get(async (req, res) => {
        ReferenceHandler.ServiceTypeView.get_service_type_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.ServiceTypeView.update_service_type(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.ServiceTypeView.remove_service_type(req, res);
    });

router.route('/references/count/service_type')
    .get(async (req, res) => {
        ReferenceHandler.ServiceTypeView.get_service_type_count(req, res);
    })

export { router };