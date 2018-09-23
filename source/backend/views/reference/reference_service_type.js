import { References } from '../../models';
import { HttpResponseError } from '../../infrastructure';
const ServiceType = References.ReferenceServiceType;

/**
 * 
 * Details:
 * 
 * Method: POST
 * 
 * Route: /references/service_type
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Тип Сервісу із тіла,
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
export async function create_service_type(req, res) {
    let err = null;
    let body = req.body;

    try {
        let service_type = new ServiceType(body);
        err = service_type.validateSync();

        if (err) {
            throw new HttpResponseError(`Bad request. Service Type object not created.`, 400, err);
        }

        service_type = await service_type.save();

        if (!service_type) {
            throw new HttpResponseError(`Service Type not saved.`, 400);
        }

        res.status(200).json(service_type);
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
 * Route: /reference/service_type/:id
 * 
 * Description:
 * Функція приймає запит від клієнта, дістає об'єкт Тип Сервісу із тіла запиту,
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
export async function update_service_type(req, res) {
    let service_type_id = req.params.id;
    let service_type = req.body;

    try {
        let update = await ServiceType.findByIdAndUpdate(service_type_id, service_type, { new: true });
        if (!update) {
            throw new HttpResponseError(`Bad request. ServiceType not found or parameters invalid.`, 400, null);
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
 * Route: /reference/service_type/:id
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
export async function remove_service_type(req, res) {
    let service_type_id = req.params.id;
    try {
        await ServiceType.remove({ _id: service_type_id });
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
 * Route: /reference/service_type/:id
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
export async function get_service_type_by_id(req, res) {
    let service_type_id = req.params.id;
    let service_type = null;

    if (!service_type_id) {
        res.status(400).json({ "Error": `Bad raquest. ServiceType id is empty.` });
        return;
    }

    try {
        service_type = await ServiceType.findById(service_type_id);

        if (!service_type) {
            throw new HttpResponseError(`ServiceType with id ${service_type_id} not found.`, 404, null);
        }

        res.status(200).json(service_type);
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
 * Route: /reference/service_type/:id
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
export async function get_all_service_types(req, res) {
    let service_types = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try {
        service_types = await ServiceType.find({}).skip(skip).limit(limit);

        if (!service_types) {
            throw new HttpResponseError(`ServiceTypes not found.`, 404, null);
        }

        res.status(200).json(service_types);
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
 * Route: /references/count/service_type
 * 
 * Description:
 * Функція повертає кількість збережених Тип Сервісу.
 * 
 * Example (GET) data:
 * {
 * 
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function get_service_type_count(req, res) {
    let service_type_count = null;
    try {
        service_type_count = await ServiceType.count();

        if (!service_type_count) {
            throw new HttpResponseError(`Can't get ServiceType count.`, 404, null);
        }

        res.status(200).json(service_type_count);
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
