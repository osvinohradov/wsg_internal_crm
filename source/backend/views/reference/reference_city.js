import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const City = References.ReferenceCity;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/city
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Населеного пункту із тіла,
 * та зберігає його в БД.
 * 
 * Example (POST) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_city(req, res) {
    let err = null;
    let body = req.body;

    try {
        let city = new City(body);
        err = city.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. City object not created.`, 400, err);
        }

        city = await city.save();

        if (!city) {
            throw new HttpResponseError(`City not saved.`, 400);
        }

        res.status(200).json(city);
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
 * Route: /reference/city/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Населеного пункту із тіла запиту,
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
export async function update_city(req, res) {
    let city_id = req.params.id;
    let city = req.body;

    try {
        let update = await City.findByIdAndUpdate(city_id, city, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. City not found or parameters invalid.`, 400, null);
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
 * Route: /reference/city/:id
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
export async function remove_city(req, res) {
    let city_id = req.params.id;
    try {
        await City.remove({ _id: city_id });
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
 * Route: /reference/city/:id
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
export async function get_city_by_id(req, res) {
    let city_id = req.params.id;
    let city = null;

    if (!city_id) {
        res.status(400).json({ "Error": `Bad raquest. City id is empty.` });
        return;
    }

    try {
        city = await City.findById(city_id);

        if (!city) {
            throw new HttpResponseError(`City with id ${city_id} not found.`, 404, null);
        }

        res.status(200).json(city);
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
 * Route: /reference/city/:id
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
export async function get_all_cities(req, res) {
    let city = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        city = await City.find({}).skip(skip).limit(limit);

        if (!city) {
            throw new HttpResponseError(`Cities not found.`, 404, null);
        }

        res.status(200).json(city);
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
 * Route: /references/count/city
 * 
 * Description:
 * Функція повертає кількість збережених Населених пунктів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_city_count(req, res) {
    let cities_count = null;
    try {
        cities_count = await City.count();
        res.status(200).json(cities_count);
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
