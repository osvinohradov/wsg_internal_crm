import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class AviaCompanyView extends BaseView{
    constructor(){
        super();
    }

    async get_avia_companies(req, res){
        let avia_company = null;
        let skip = 0;
        let limit = 10;
        try{
            avia_company = await Ref.AviaCompanyModel.find({}).skip(skip).limit(limit);

            this.send_success_response(res, avia_company);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_avia_company(req, res){
        let avia_company_id = req.params.id;
        try{
            let avia_company = await Ref.AviaCompanyModel.findOne({ _id: avia_company_id});

            this.send_success_response(res, avia_company);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_avia_company(req, res){
        let avia_company = req.body;

        avia_company = new Ref.AviaCompanyModel(avia_company);
        let is_invalid = avia_company.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        avia_company = await avia_company.save();

        this.send_success_response(res, avia_company);
    }

    async update_avia_company(req, res){
        let avia_company_id = req.params.id;
        let avia_company = req.body;

        // TODO: Validate body
        avia_company = await Ref.AviaCompanyModel.findOneAndUpdate({ _id: avia_company_id }, avia_company, { new: true });

        this.send_success_response(res, avia_company);
    }

    async delete_avia_company(req, res){
        let avia_company_id = req.params.id;

        let deleted = await Ref.AviaCompanyModel.findOneAndDelete({ _id: avia_company_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_avia_company_count(req, res){
        let avia_company_count = null;

        avia_company_count = await Ref.AviaCompanyModel.countDocuments({});

        this.send_success_response(res, { count: avia_company_count});
    }
}

export default new AviaCompanyView();