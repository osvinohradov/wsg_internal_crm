import { References } from '../../models';
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
 *      Code: {Number};
 *      Name: {String};
 * }
 * 
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
export async function create_airport(req, res) {
    let err = null;
    let body = req.body;

    try{
        
        let airport = new Airport(body);
        err = airport.validateSync();

        if(err){
            throw new Error(err);
        }
        airport._id = undefined;
        airport = await airport.save();

        if(!airport){
            throw new Error("Reference Airport data was not stored.")
        }
        console.log(airport)
        res.status(200).json(airport);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function update_airport(req, res) {
    let airport_id = req.params.id;
    let airport = req.body;

    try{
        let update = await Airport.findByIdAndUpdate(airport_id, airport, { new: true });
        if(!update){
            res.status(404).json({ "Error": "Airport was not update." });
        }

        res.status(200).json(update);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function remove_airport(req, res) {
    let airport_id = req.params.id;
    try{
        await Airport.remove({ _id: airport_id });
        res.status(200).json({ "Status": `OK.` });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function get_airport_by_id(req, res) {
    let airport_id = req.params.id;
    let airport = null;

    if(!airport_id){
        res.status(400).json({ "Error": `Bad raquest. Airport id is empty.` });
        return;
    }

    try{
        airport = await Airport.findById(airport_id);

        if(!airport){
            res.status(404).json({ "Error": `Airport with ${airport_id} id not found.` });
            return;
        }

        res.status(200).json(airport);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function get_all_airports(req, res) {
    let airports = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try{
        airports = await Airport.find({}).skip(skip).limit(limit);

        if(!airports){
            res.status(400).json({ "Error": `Airports not found.` });
            return;
        }

        res.status(200).json(airports);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function get_airport_count(req, res) {
    let airports_count = null;
    try{
        airports_count = await Airport.find({}).count();
        console.log(airports_count)

        if(!airports_count){
            res.status(400).json({ "Error": `Airports not found.` });
            return;
        }

        res.status(200).json(airports_count);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}
