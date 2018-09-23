import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const Airport = References.ReferenceAirport;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /reference/airport
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт аеропорту із тіла, та зберігає його в БД.
 * 
 * Example (POST) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_airport(req, res) {
    let err = null;
    let body = req.body;

    try {
        let airport = new Airport(body);
        err = airport.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Airport object not created.`, 400, err);
        }

        airport = await airport.save();

        if (!airport) {
            throw new HttpResponseError(`Airport not saved.`, 400);
        }

        res.status(200).json(airport);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: PUT
 * 
 * Route: /reference/airport/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт аеропорту із тіла запиту,
 * та ідентифікатор із рядка запиту, та обовлює вже існуючий об'єкт в БД.
 * 
 * Example (PUT) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function update_airport(req, res) {
    let airport_id = req.params.id;
    let airport = req.body;

    try {
        let update = await Airport.findByIdAndUpdate(airport_id, airport, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Airport not found or parameters invalid.`, 400, null);
        }

        res.status(200).json(update);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: DELETE
 * 
 * Route: /reference/airport/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає ідентифікатор із рядка запиту,
 * знаходить обє'кт в БД та видаляє його.
 * 
 * Example (DELETE) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function remove_airport(req, res) {
    let airport_id = req.params.id;
    try {
        await Airport.remove({ _id: airport_id });
        res.status(200).json({ "Status": `OK.` });
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /reference/airport/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає ідентифікатор із рядка запиту,
 * знаходить обє'кт в БД та повертає його клієнту.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_airport_by_id(req, res) {
    let airport_id = req.params.id;
    let airport = null;

    if (!airport_id) {
        res.status(400).json({ "Error": `Bad raquest. Airport id is empty.` });
        return;
    }

    try {
        airport = await Airport.findById(airport_id);

        if (!airport) {
            throw new HttpResponseError(`Airport with id ${airport_id} not found.`, 404, null);
        }

        res.status(200).json(airport);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /reference/airport/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає ідентифікатор із рядка запиту,
 * знаходить всі обє'кти в БД та повертає їх клієнту.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_all_airports(req, res) {
    let airports = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        airports = await Airport.find({}).skip(skip).limit(limit);

        if (!airports) {
            throw new HttpResponseError(`Airports not found.`, 404, null);
        }

        res.status(200).json(airports);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /reference/count/airport
 * 
 * Description:
 * Функція повертає кількість збережених аеропортів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_airport_count(req, res) {
    let airports_count = null;
    try {
        airports_count = await Airport.count();

        if (!airports_count) {
            throw new HttpResponseError(`Can't get airports count.`, 404, null);
        }

        res.status(200).json(airports_count);
    }
    catch (err) {
        if(err instanceof HttpResponseError){
            console.log(err.message);
            return res.status(err.status_code).json({ "Error": err.message });
        }
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error. See logs.` });
    }
}
