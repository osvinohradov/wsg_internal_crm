import { BaseView, Exception } from '../lib';
import { OrganizationModel } from '../models';
import { generate_random_number } from '../helpers';


class OrganizationView extends BaseView{
    constructor(){
        super();
    }

    async get_organizations_names(req, res){
       let organizations = null;

       let organization_name = req.query.organization_name;

        try{
            organizations = await OrganizationModel.get_organizations_names(organization_name);

            this.send_success_response(res, organizations);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, {}, 500);
        }
    }
}

export default new OrganizationView();