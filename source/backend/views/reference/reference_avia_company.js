import { References } from '../../models';
const AviaCompany = References.ReferenceAviaCompany;

/**
 * 
 * @param {HttpRequest} req 
 * @param {HttpRequest} res 
 */
export async function create_avia_company(req, res) {
    let err = null;
    let body = req.body;

    try{
        
        let avia_company = new AviaCompany(body);
        err = avia_company.validateSync();

        if(err){
            throw new Error(err);
        }
        avia_company._id = undefined;
        avia_company = await avia_company.save();

        if(!avia_company){
            throw new Error("Reference Airport data was not stored.")
        }
        res.status(200).json(avia_company);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {HttpRequest} req 
 * @param {HttpRequest} res 
 */
export async function update_avia_company(req, res){
    let avia_company_id = req.params.id;
    let avia_company = req.body;

    try{
        let update = await AviaCompany.findByIdAndUpdate(avia_company_id, avia_company, { new: true });
        if(!update){
            res.status(404).json({ "Error": "Avia Company was not update." });
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
 * @param {HttpRequest} req
 * @param {HttpRequest} res
 */
export async function remove_avia_company(req, res){
    let avia_company_id = req.params.id;
    try{
        await AviaCompany.remove({ _id: avia_company_id });
        res.status(200).json({ "Status": `OK.` });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {HttpRequest} req 
 * @param {HttpRequest} res 
 */
export async function get_avia_company_by_id(req, res){
    let avia_company_id = req.params.id;
    let avia_company = null;

    if(!avia_company_id){
        res.status(400).json({ "Error": `Bad raquest. Avia Company id is empty.` });
        return;
    }

    try{
        avia_company = await AviaCompany.findById(avia_company_id);

        if(!avia_company){
            res.status(404).json({ "Error": `Avia Company with ${avia_company_id} id not found.` });
            return;
        }

        res.status(200).json(avia_company);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {HttpRequest} req 
 * @param {HttpRequest} res 
 */
export async function get_all_avia_companies(req, res){
    let avia_companies = null;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    try{
        avia_companies = await AviaCompany.find({}).skip(skip).limit(limit);

        if(!avia_companies){
            res.status(400).json({ "Error": `Avia Company not found.` });
            return;
        }

        res.status(200).json(avia_companies);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}

/**
 * 
 * @param {HttpRequest} req 
 * @param {HttpRequest} res 
 */
export async function get_avia_company_count(req, res){
    let avia_company_count = null;
    try{
        avia_company_count = await AviaCompany.find({}).count();
        console.log(avia_company_count)

        if(!avia_company_count){
            res.status(400).json({ "Error": `Avia Company not found.` });
            return;
        }

        res.status(200).json(avia_company_count);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ "Error": `Internal Server Error.` });
    }
}
