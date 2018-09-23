import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/city')
    .get(async (req, res) => {
        ReferenceHandler.CityView.get_all_cities(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.CityView.create_city(req, res);
    });

router.route('/references/city/:id')
    .get(async (req, res) => {
        ReferenceHandler.CityView.get_city_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.CityView.update_city(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.CityView.remove_city(req, res);
    });

router.route('/references/count/city')
    .get(async (req, res) => {
        ReferenceHandler.CityView.get_city_count(req, res);
    })

export { router };