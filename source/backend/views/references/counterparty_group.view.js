import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class CounterpartyGroupController extends BaseView{
    constructor(){
        super();
    }

    async get_service_types(req, res){
        let service_types = null;
        let skip = 0;
        let limit = 10;
        try{
            service_types = await Ref.ServiceTypeModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, service_types);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_service_type(req, res){
        let service_type_id = req.params.id;
        try{
            let service_type = await Ref.ServiceTypeModel.findOne({ _id: service_type_id});

            this.send_success_response(res, service_type);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_service_type(req, res){
        let service_type = req.body;

        service_type = new Ref.ServiceTypeModel(service_type);
        let is_invalid = service_type.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        service_type = await service_type.save();

        this.send_success_response(res, service_type);
    }

    async update_service_type(req, res){
        let service_type_id = req.params.id;
        let service_type = req.body;

        // TODO: Validate body
        service_type = await Ref.ServiceTypeModel.findOneAndUpdate({ _id: service_type_id }, service_type, { new: true });

        this.send_success_response(res, service_type);
    }

    async delete_service_type(req, res){
        let service_type_id = req.params.id;

        let deleted = await Ref.ServiceTypeModel.findOneAndDelete({ _id: service_type_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_service_type_count(req, res){
        let service_type_count = null;

        service_type_count = await Ref.ServiceTypeModel.countDocuments({});

        this.send_success_response(res, { count: service_type_count});
    }
}

export default new CounterpartyGroupController();