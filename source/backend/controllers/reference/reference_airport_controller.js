import { ReferenceHandler } from '../../views';
import { Router } from 'express';
ReferenceHandler.AirportsView
const router = Router();

router.route('/references/airport')
    .get(async (req, res) => {
        ReferenceHandler.AirportsView.get_all_airports(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.AirportsView.create_airport(req, res);
    });

router.route('/references/airport/:id')
    .get(async (req, res) => {
        ReferenceHandler.AirportsView.get_airport_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.AirportsView.update_airport(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.AirportsView.remove_airport(req, res);
    });

router.route('/references/count/airport')
    .get(async (req, res) => {
        ReferenceHandler.AirportsView.get_airport_count(req, res);
    })

export { router };