import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const Nomenclature = References.ReferenceNomenclature;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/nomenclature
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Номенклатура із тіла,
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
export async function create_nomenclature(req, res) {
    let err = null;
    let body = req.body;

    try {
        let nomenclature = new Nomenclature(body);
        err = nomenclature.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Nomenclature object not created.`, 400, err);
        }

        nomenclature = await nomenclature.save();

        if (!nomenclature) {
            throw new HttpResponseError(`Nomenclature not saved.`, 400);
        }

        res.status(200).json(nomenclature);
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
 * Route: /reference/nomenclature/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Номенклатура із тіла запиту,
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
export async function update_nomenclature(req, res) {
    let nomenclature_id = req.params.id;
    let nomenclature = req.body;

    try {
        let update = await Nomenclature.findByIdAndUpdate(nomenclature_id, nomenclature, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Nomenclature not found or parameters invalid.`, 400, null);
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
 * Route: /reference/nomenclature/:id
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
export async function remove_nomenclature(req, res) {
    let nomenclature_id = req.params.id;
    try {
        await Nomenclature.remove({ _id: nomenclature_id });
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
 * Route: /reference/nomenclature/:id
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
export async function get_nomenclature_by_id(req, res) {
    let nomenclature_id = req.params.id;
    let nomenclature = null;

    if (!nomenclature_id) {
        res.status(400).json({ "Error": `Bad raquest. Nomenclature id is empty.` });
        return;
    }

    try {
        nomenclature = await Nomenclature.findById(nomenclature_id);

        if (!nomenclature) {
            throw new HttpResponseError(`Nomenclature with id ${nomenclature_id} not found.`, 404, null);
        }

        res.status(200).json(nomenclature);
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
 * Route: /reference/nomenclature/:id
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
export async function get_all_nomenclatures(req, res) {
    let nomenclatures = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        nomenclatures = await Nomenclature.find({}).skip(skip).limit(limit);

        if (!nomenclatures) {
            throw new HttpResponseError(`Nomenclature not found.`, 404, null);
        }

        res.status(200).json(nomenclatures);
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
 * Route: /references/count/nomenclature
 * 
 * Description:
 * Функція повертає кількість збережених Номенклатур.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_nomenclature_count(req, res) {
    let nomenclature_count = null;
    try {
        nomenclature_count = await Nomenclature.count();

        if (!nomenclature_count) {
            throw new HttpResponseError(`Can't get Nomenclature count.`, 404, null);
        }

        res.status(200).json(nomenclature_count);
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
