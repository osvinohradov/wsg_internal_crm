import { Router } from 'express';

import { ref_railway_station_handler } from '../views';

const router = Router();

router.route('/ref/railway_stations/names')
    // Отримати всі існуючі рахунки
    .get(async (req, res) => {
        ref_railway_station_handler.get_railway_stations_names(req, res);
    });

export { router };