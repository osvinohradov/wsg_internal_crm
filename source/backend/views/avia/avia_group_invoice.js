import { Avia } from '../../models';
const AviaGroupInvoice = Avia.AviaGroupInvoice;

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
export async function create_avia_group_invoice(req, res) {
    let err = null;
    let body = req.body;

    try{
        
        let avia_group_invoice = new AviaGroupInvoice(body);
        err = avia_group_invoice.validateSync();

        if(err){
            throw new Error(err);
        }
        avia_group_invoice._id = undefined;
        avia_group_invoice = await avia_group_invoice.save();

        if(!avia_group_invoice){
            throw new Error("Avia Group Invoice data was not stored.")
        }
        console.log(avia_group_invoice)
        res.status(200).json(avia_group_invoice);
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
export async function update_avia_group_invoice(req, res) {
    let avia_group_invoice_id = req.params.id;
    let avia_group_invoice = req.body;

    try{
        let update = await AviaGroupInvoice.findByIdAndUpdate(avia_group_invoice_id, avia_group_invoice, { new: true });
        if(!update){
            res.status(404).json({ "Error": "Avia Group Invoice was not update." });
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
export async function remove_avia_group_invoice(req, res) {
    let avia_group_invoice_id = req.params.id;
    try{
        await AviaGroupInvoice.remove({ _id: avia_group_invoice_id });
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
export async function get_avia_group_invoice_by_id(req, res) {
    let avia_group_invoice_id = req.params.id;
    let avia_group_invoice = null;

    if(!avia_group_invoice_id){
        res.status(400).json({ "Error": `Bad raquest. Avia Group Invoice id is empty.` });
        return;
    }

    try{
        avia_group_invoice = await AviaGroupInvoice.findById(avia_group_invoice_id);

        if(!avia_group_invoice){
            res.status(404).json({ "Error": `Avia Group Invoice with ${avia_group_invoice_id} id not found.` });
            return;
        }

        res.status(200).json(avia_group_invoice);
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
export async function get_all_avia_group_invoices(req, res) {
    let avia_group_invoice = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try{
        avia_group_invoice = await AviaGroupInvoice.find({}).skip(skip).limit(limit).populate({
            path: 'AviaInvoicesId',
            model: 'AviaInvocie'
        });

        if(!avia_group_invoice){
            res.status(400).json({ "Error": `Avia Group Invoice not found.` });
            return;
        }

        res.status(200).json(avia_group_invoice);
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
export async function get_avia_group_invoice_count(req, res) {
    let avia_group_invoice_count = null;
    try{
        avia_group_invoice_count = await AviaGroupInvoice.count();
        console.log(avia_group_invoice_count)

        if(!avia_group_invoice_count){
            res.status(400).json({ "Error": `Avia Group Invoice not found.` });
            return;
        }

        res.status(200).json(avia_group_invoice_count);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

export async function get_avia_group_invoice_content(req, res){
    let query = req.query;
    console.log(query);
    let avia_group_invoices = null;
    let db_query = {};
    try{
        if(query.name){
            db_query.Name = new RegExp(query.name);
        }
        avia_group_invoices = await AviaGroupInvoice.find(db_query).select('Content');
        console.log(avia_group_invoices)

        if(!avia_group_invoices){
            res.status(400).json({ "Error": `Avia Group Invoice not found.` });
            return;
        }

        res.status(200).json(avia_group_invoices);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}
