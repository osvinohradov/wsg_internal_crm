import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceIndividualCounterpartyView extends BaseView{
    constructor(){
        super();
    }

    async get_individual_counterparties_names(req, res){
       let individual_counterparties = null;

       let individual_counterparty_name = req.query.individual_counterparty_name;

        try{
            individual_counterparties = await Ref.ReferenceIndividualCounterpartiesModel.get_individual_counterparties_names(individual_counterparty_name);

            this.send_success_response(res, 200, individual_counterparties);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceIndividualCounterpartyView();