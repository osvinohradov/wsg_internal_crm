import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class CounterpartyView extends BaseView{
    constructor(){
        super();
    }

    async get_counterparties(req, res){
        let counterparties = null;
        let skip = 0;
        let limit = 10;
        try{
            counterparties = await Ref.CounterpartyModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, counterparties);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_counterparty(req, res){
        let counterparty_id = req.params.id;
        try{
            let counterparty = await Ref.CounterpartyModel.findOne({ _id: counterparty_id});

            this.send_success_response(res, counterparty);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_counterparty(req, res){
        let counterparty = req.body;

        counterparty = new Ref.CounterpartyModel(counterparty);
        let is_invalid = counterparty.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        counterparty = await counterparty.save();

        this.send_success_response(res, counterparty);
    }

    async update_counterparty(req, res){
        let counterparty_id = req.params.id;
        let counterparty = req.body;

        // TODO: Validate body
        counterparty = await Ref.CounterpartyModel.findOneAndUpdate({ _id: counterparty_id }, counterparty, { new: true });

        this.send_success_response(res, counterparty);
    }

    async delete_counterparty(req, res){
        let counterparty_id = req.params.id;

        let deleted = await Ref.CounterpartyModel.findOneAndDelete({ _id: counterparty_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_counterparties_count(req, res){
        let counterparties_count = null;

        counterparties_count = await Ref.CounterpartyModel.countDocuments({});

        this.send_success_response(res, { count: counterparties_count});
    }

    async get_counterparties_names(req, res){
       let counterparties = null;
       let counterparty_name = req.query.counterparty_name;

        try{
           counterparties = await Ref.CounterpartyModel.get_counterparties_names(counterparty_name);

            this.send_success_response(res, counterparties);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new CounterpartyView();