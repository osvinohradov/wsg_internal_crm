import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const CurrencyExchange = References.ReferenceCurrencyExchange;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/currency_exchange
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
export async function create_currency_exchange(req, res) {
    let err = null;
    let body = req.body;

    try {
        let currency_exchange = new CurrencyExchange(body);
        err = currency_exchange.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Currency Exchange object not created.`, 400, err);
        }

        currency_exchange = await currency_exchange.save();

        if (!currency_exchange) {
            throw new HttpResponseError(`Currency Exchange not saved.`, 400);
        }

        res.status(200).json(currency_exchange);
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
 * Route: /reference/currency_exchange/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Обмін валют із тіла запиту,
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
export async function update_currency_exchange(req, res) {
    let currency_exchange_id = req.params.id;
    let currency_exchange = req.body;

    try {
        let update = await CurrencyExchange.findByIdAndUpdate(currency_exchange_id, currency_exchange, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Currency Exchange not found or parameters invalid.`, 400, null);
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
 * Route: /reference/currency_exchange/:id
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
export async function remove_currency_exchange(req, res) {
    let currency_exchange_id = req.params.id;
    try {
        await CurrencyExchange.remove({ _id: currency_exchange_id });
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
 * Route: /reference/currency_exchange/:id
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
export async function get_currency_exchange_by_id(req, res) {
    let currency_exchange_id = req.params.id;
    let currency_exchange = null;

    if (!currency_exchange_id) {
        res.status(400).json({ "Error": `Bad raquest. Currency Exchange id is empty.` });
        return;
    }

    try {
        currency_exchange = await CurrencyExchange.findById(currency_exchange_id);

        if (!currency_exchange) {
            throw new HttpResponseError(`Currency Exchange with id ${currency_exchange_id} not found.`, 404, null);
        }

        res.status(200).json(currency_exchange);
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
 * Route: /reference/currency_exchange/:id
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
export async function get_all_currency_exchange(req, res) {
    let currency_exchange = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        currency_exchange = await CurrencyExchange.find({}).skip(skip).limit(limit);

        if (!currency_exchange) {
            throw new HttpResponseError(`Currency Exchange not found.`, 404, null);
        }

        res.status(200).json(currency_exchange);
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
 * Route: /references/count/currency_exchange
 * 
 * Description:
 * Функція повертає кількість збережених Обмін валют.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_currency_exchange_count(req, res) {
    let currency_exchange_count = null;
    try {
        currency_exchange_count = await CurrencyExchange.count();

        if (!currency_exchange_count) {
            throw new HttpResponseError(`Can't get Currency Exchange count.`, 404, null);
        }

        res.status(200).json(currency_exchange_count);
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
