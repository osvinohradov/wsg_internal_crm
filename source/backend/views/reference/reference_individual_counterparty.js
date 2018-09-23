import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const IndividualCounterparty = References.ReferenceIndividualCounterparties;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/individual_counterparty
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
export async function create_individual_counterparty(req, res) {
    let err = null;
    let body = req.body;

    try {
        let individual_counterparty = new IndividualCounterparty(body);
        err = individual_counterparty.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Individual Counterparty object not created.`, 400, err);
        }

        individual_counterparty = await individual_counterparty.save();

        if (!individual_counterparty) {
            throw new HttpResponseError(`Individual Counterparty not saved.`, 400);
        }

        res.status(200).json(individual_counterparty);
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
 * Route: /reference/individual_counterparty/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Фізичні особи контрагентів із тіла запиту,
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
export async function update_individual_counterparty(req, res) {
    let individual_counterparty_id = req.params.id;
    let individual_counterparty = req.body;

    try {
        let update = await IndividualCounterparty.findByIdAndUpdate(individual_counterparty_id, individual_counterparty, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Individual Counterparty not found or parameters invalid.`, 400, null);
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
 * Route: /reference/individual_counterparty/:id
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
export async function remove_individual_counterparty(req, res) {
    let individual_counterparty_id = req.params.id;
    try {
        await IndividualCounterparty.remove({ _id: individual_counterparty_id });
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
 * Route: /reference/individual_counterparty/:id
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
export async function get_individual_counterparty_by_id(req, res) {
    let individual_counterparty_id = req.params.id;
    let individual_counterparty = null;

    if (!individual_counterparty_id) {
        res.status(400).json({ "Error": `Bad raquest. Individual Counterparty id is empty.` });
        return;
    }

    try {
        individual_counterparty = await IndividualCounterparty.findById(individual_counterparty_id);

        if (!individual_counterparty) {
            throw new HttpResponseError(`Individual Counterparty with id ${individual_counterparty_id} not found.`, 404, null);
        }

        res.status(200).json(individual_counterparty);
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
 * Route: /reference/individual_counterparty/:id
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
export async function get_all_individual_counterparties(req, res) {
    let individual_counterparty = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        individual_counterparty = await IndividualCounterparty.find({}).skip(skip).limit(limit);

        if (!individual_counterparty) {
            throw new HttpResponseError(`Individual Counterparty not found.`, 404, null);
        }

        res.status(200).json(individual_counterparty);
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
 * Route: /references/count/individual_counterparty
 * 
 * Description:
 * Функція повертає кількість збережених Фізичні особи контрагентів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_individual_counterparty_count(req, res) {
    let individual_counterparty_count = null;
    try {
        individual_counterparty_count = await IndividualCounterparty.count();

        if (!individual_counterparty_count) {
            throw new HttpResponseError(`Can't get Individual Counterparty count.`, 404, null);
        }

        res.status(200).json(individual_counterparty_count);
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
