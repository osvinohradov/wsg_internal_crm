import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const Counterparty = References.ReferenceCounterparty;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/counterparty
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Контрагента із тіла,
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
export async function create_counterparty(req, res) {
    let err = null;
    let body = req.body;

    try {
        let counterparty = new Counterparty(body);
        err = counterparty.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Counterparty object not created.`, 400, err);
        }

        counterparty = await counterparty.save();

        if (!counterparty) {
            throw new HttpResponseError(`Counterparty not saved.`, 400);
        }

        res.status(200).json(counterparty);
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
 * Route: /reference/counterparty/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Контрагент із тіла запиту,
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
export async function update_counterparty(req, res) {
    let counterparty_id = req.params.id;
    let counterparty = req.body;

    try {
        let update = await Counterparty.findByIdAndUpdate(counterparty_id, counterparty, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Counterpary not found or parameters invalid.`, 400, null);
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
 * Route: /reference/counterparty/:id
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
export async function remove_counterparty(req, res) {
    let counterparty_id = req.params.id;
    try {
        await Counterparty.remove({ _id: counterparty_id });
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
 * Route: /reference/counterparty/:id
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
export async function get_counterparty_by_id(req, res) {
    let counterparty_id = req.params.id;
    let counterparty = null;

    if (!counterparty_id) {
        res.status(400).json({ "Error": `Bad raquest. Counterparty id is empty.` });
        return;
    }

    try {
        counterparty = await Counterparty.findById(counterparty_id);

        if (!counterparty) {
            throw new HttpResponseError(`Counterparty with id ${counterparty_id} not found.`, 404, null);
        }

        res.status(200).json(counterparty);
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
 * Route: /reference/counterparty/:id
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
export async function get_counterparty_by_name(req, res) {
    let counterparty_name = req.query.search_name;
    let counterparty_name_regexp = new RegExp(counterparty_name, 'i');
    try {
        counterparty_name = await Counterparty.find({ Name: { $regex: counterparty_name_regexp } });

        if (!counterparty_name) {
            throw new HttpResponseError(`Counterparty with namw ${counterparty_name} not found.`, 404, null);
        }

        res.status(200).json(counterparty_name);
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
 * Route: /reference/counterparty/:id
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
export async function get_all_counterparties(req, res) {
    let counterparty = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        counterparty = await Counterparty.find({}).skip(skip).limit(limit);

        if (!counterparty) {
            throw new HttpResponseError(`Counterparty not found.`, 404, null);
        }

        res.status(200).json(counterparty);
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
 * Route: /references/count/counterparty
 * 
 * Description:
 * Функція повертає кількість збережених Контрагентів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_counterparty_count(req, res) {
    let counterparties_count = null;
    try {
        counterparties_count = await Counterparty.count();

        if (!counterparties_count) {
            throw new HttpResponseError(`Can't get Counterparties count.`, 404, null);
        }

        res.status(200).json(counterparties_count);
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
 * Route: /references/count/counterparty
 * 
 * Description:
 * Функція повертає кількість збережених Контрагентів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_counterparties_names(req, res) {
    let query = req.query;
    console.log(query);
    let counterparties = null;
    let db_query = {};
    try {
        if(query.name){
            db_query.Name = new RegExp(query.name);
        }
        counterparties = await Counterparty.find(db_query).select('Name');
        console.log(counterparties);

        if (!counterparties) {
            throw new HttpResponseError(`Can't get Counterparties names.`, 404, null);
        }

        res.status(200).json(counterparties);
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
