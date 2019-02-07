import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceServiceTypeView extends BaseView{
    constructor(){
        super();
    }

    async get_service_types_names(req, res){
       let service_types = null;

       let service_type_name = req.query.service_type_name;

        try{
            service_types = await Ref.ReferenceServiceTypeModel.get_service_types_names(service_type_name);

            this.send_success_response(res, 200, service_types);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceServiceTypeView();