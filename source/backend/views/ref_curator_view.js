import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceCuratorView extends BaseView{
    constructor(){
        super();
    }

    async get_curators_names(req, res){
       let curators = null;

       let curator_name = req.query.curator_name;

        try{
            curators = await Ref.ReferenceCuratorModel.get_curators_names(curator_name);

            this.send_success_response(res, 200, curators);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceCuratorView();