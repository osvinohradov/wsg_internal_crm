import { Insurance } from '../../models';

/**
 * 
 * Details:
 * 
 * Method: GET
 * 
 * Route: /insurance/invoices
 * 
 * Description:
 * Функція знаходить всі ??? з параметрами skip та limit і повертає клієнту виборку.
 * 
 * Example (POST) data:
 * {
 * }
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
export async function get_all_insurance_invoices(req, res){
    let avia_invoices = null;
    let skip = req.query.skip ? req.query.skip : 0;
    let limit = req.query.limit ? req.query.limit : 15;

    try{
        res.status(200).json(get_mock_invoice());
        return;
        avia_invoices = await Avia.AviaInvoice.find({}).skip(skip).limit(limit);

        if(!avia_invoices){
            res.status(404).json({ "Error": "Avia Invoices not found." });
            return;
        }

        res.status(200).json(avia_invoices);
    }
    catch(err){
        console.log(err);
        req.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /insurance/invoice
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт ??? із тіла, та зберігає його в БД.
 * 
 * Example (POST) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_insurance_invoice(req, res) {
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
 * Route: /insurance/invoice/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт ??? із тіла запиту,
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
export async function update_insurance_invoice(req, res) {
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
 * Route: /insurance/invoice/:id
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
export async function remove_insurance_invoice(req, res) {
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
 * Route: /insurance/invoice/:id
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
export async function get_insurance_invoice_by_id(req, res) {
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
 * Route: /insurance/count/invoice
 * 
 * Description:
 * Функція повертає кількість збережених ???.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_insurance_invoice_count(req, res) {
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
