import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const Curator = References.ReferenceCurator;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/curator
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
export async function create_curator(req, res) {
    let err = null;
    let body = req.body;

    try {
        let curator = new Curator(body);
        err = curator.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Curator object not created.`, 400, err);
        }

        curator = await curator.save();

        if (!curator) {
            throw new HttpResponseError(`Curator not saved.`, 400);
        }

        res.status(200).json(curator);
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
 * Route: /reference/curator/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Куратор із тіла запиту,
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
export async function update_curator(req, res) {
    let curator_id = req.params.id;
    let curator = req.body;

    try {
        let update = await Curator.findByIdAndUpdate(curator_id, curator, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. Curator not found or parameters invalid.`, 400, null);
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
 * Route: /reference/curator/:id
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
export async function remove_curator(req, res) {
    let curator_id = req.params.id;
    try {
        await Curator.remove({ _id: curator_id });
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
 * Route: /reference/curator/:id
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
export async function get_curator_by_id(req, res) {
    let curator_id = req.params.id;
    let curator = null;

    if (!curator_id) {
        res.status(400).json({ "Error": `Bad raquest. Curator id is empty.` });
        return;
    }

    try {
        curator = await Curator.findById(curator_id);

        if (!curator) {
            throw new HttpResponseError(`Curator with id ${curator_id} not found.`, 404, null);
        }

        res.status(200).json(curator);
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
 * Route: /reference/curator/:id
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
export async function get_all_curators(req, res) {
    let curator = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let search = req.query.q;
    try {
        curator = await Curator.find({}).skip(skip).limit(limit);

        if (!curator) {
            throw new HttpResponseError(`Curator not found.`, 404, null);
        }

        res.status(200).json(curator);
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
 * Route: /references/count/curator
 * 
 * Description:
 * Функція повертає кількість збережених Кураторів.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_curator_count(req, res) {
    let curators_count = null;
    try {
        curators_count = await Curator.count();
        res.status(200).json(curators_count);
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
