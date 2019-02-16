import { BaseView, Exception } from '../lib';
import { OrganizationModel } from '../models';
import { generate_random_number } from '../helpers';


class RefAirportView extends BaseView{
    constructor(){
        super();
    }

    async get_airports(req, res){
       let organizations = null;

       let organization_name = req.query.organization_name;

        try{
            organizations = await OrganizationModel.get_organizations_names(organization_name);

            this.send_success_response(res, 200, organizations);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }

    // async get_
}

export default new RefAirportView();