import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const AviaCompany = References.ReferenceAviaCompany;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /reference/avia_company
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт авіа команії із тіла, та зберігає його в БД.
 * 
 * Example (POST) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_avia_company(req, res) {
    let err = null;
    let body = req.body;

    try {
        let avia_company = new AviaCompany(body);
        err = avia_company.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Avia Company object not created.`, 400, err);
        }

        avia_company = await avia_company.save();

        if (!avia_company) {
            throw new HttpResponseError(`Avia Company not saved.`, 400);
        }

        res.status(200).json(avia_company);
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
 * Route: /reference/avia_company/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт авіа компанії із тіла запиту,
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
export async function update_avia_company(req, res) {
    let avia_company_id = req.params.id;
    let avia_company = req.body;

    try {
        let update = await AviaCompany.findByIdAndUpdate(avia_company_id, avia_company, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Avia Company not found or parameters invalid.`, 400, null);
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
 * Route: /reference/avia_company/:id
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
export async function remove_avia_company(req, res) {
    let avia_company_id = req.params.id;
    try {
        await AviaCompany.remove({ _id: avia_company_id });
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
 * Route: /reference/avia_company/:id
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
export async function get_avia_company_by_id(req, res) {
    let avia_company_id = req.params.id;
    let avia_company = null;

    if (!avia_company_id) {
        res.status(400).json({ "Error": `Bad raquest. Avia Company id is empty.` });
        return;
    }

    try {
        avia_company = await AviaCompany.findById(avia_company_id);

        if (!avia_company) {
            throw new HttpResponseError(`Avia Company with id ${avia_company_id} not found.`, 404, null);
        }

        res.status(200).json(avia_company);
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
 * Route: /reference/avia_company/:id
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
export async function get_all_avia_companies(req, res) {
    let avia_companies = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        avia_companies = await AviaCompany.find({}).skip(skip).limit(limit);

        if (!avia_companies) {
            throw new HttpResponseError(`Avia Companies not found.`, 404, null);
        }

        res.status(200).json(avia_companies);
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
 * Route: /references/count/avia_company
 * 
 * Description:
 * Функція повертає кількість збережених авіа компаній.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_avia_company_count(req, res) {
    let avia_companies_count = null;
    try {
        avia_companies_count = await AviaCompany.count();

        if (!avia_companies_count) {
            throw new HttpResponseError(`Can't get Avia Companies count.`, 404, null);
        }

        res.status(200).json(avia_companies_count);
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
