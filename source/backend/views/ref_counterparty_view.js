import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class ReferenceCounterpartyView extends BaseView{
    constructor(){
        super();
    }

    async get_counterparties_names(req, res){
       let counterparties = null;

       let counterparty_name = req.query.counterparty_name;

        try{
           counterparties = await Ref.ReferenceCounterpartyModel.get_counterparties_names(counterparty_name);

            this.send_success_response(res, 200, counterparties);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new ReferenceCounterpartyView();