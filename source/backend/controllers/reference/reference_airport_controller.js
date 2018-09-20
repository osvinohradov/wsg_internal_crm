import { ReferenceHandler } from '../../views';
import { Router } from 'express';

const router = Router();

router.route('/references/airport')
    .get(async (req, res) => {
        ReferenceHandler.Airports.get_all_airports(req, res);
    })
    .post(async (req, res) => {
        ReferenceHandler.Airports.create(req, res);
    });

router.route('/references/airport/:id')
    .get(async (req, res) => {
        ReferenceHandler.Airports.get_by_id(req, res);
    })
    .put(async (req, res) => {
        ReferenceHandler.Airports.update(req, res);
    })
    .delete(async (req, res) => {
        ReferenceHandler.Airports.remove(req, res);
    });

router.route('/references/airport/count')
    .get(async (req, res) => {
        ReferenceHandler.Airports.get_airports_count(req, res);
    })

export { router };