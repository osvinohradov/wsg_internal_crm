import { Router } from 'express';

import { References } from '../../views';

const router = Router();

router.route('/reference/airports')
    .get(async (req, res) => {
        References.AirportController.get_airports(req, res);
    });

router.route('/reference/airport/:id')
    .get(async (req, res) => {
        References.AirportController.get_airport(req, res);
    });

router.route('/reference/count/airport')
    .get(async (req, res) => {
        res.sendStatus(200).send(2)
    });


export default router;