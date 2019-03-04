import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class CounterpartyContractView extends BaseView{
    constructor(){
        super();
    }

    async get_counterparty_contracts(req, res){
        let counterparty_contract = null;
        let skip = 0;
        let limit = 10;
        try{
            counterparty_contract = await Ref.CounterpartyContractModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, counterparty_contract);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_counterparty_contract(req, res){
        let counterparty_contract_id = req.params.id;
        try{
            let counterparty_contract = await Ref.CounterpartyContractModel.findOne({ _id: counterparty_contract_id});

            this.send_success_response(res, counterparty_contract);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_counterparty_contract(req, res){
        let counterparty_contract = req.body;

        counterparty_contract = new Ref.CounterpartyContractModel(counterparty_contract);
        let is_invalid = counterparty_contract.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        counterparty_contract = await counterparty_contract.save();

        this.send_success_response(res, counterparty_contract);
    }

    async update_counterparty_contract(req, res){
        let counterparty_contract_id = req.params.id;
        let counterparty_contract = req.body;

        // TODO: Validate body
        counterparty_contract = await Ref.CounterpartyContractModel.findOneAndUpdate({ _id: counterparty_contract_id }, counterparty_contract, { new: true });

        this.send_success_response(res, counterparty_contract);
    }

    async delete_counterparty_contract(req, res){
        let counterparty_contract_id = req.params.id;

        let deleted = await Ref.CounterpartyContractModel.findOneAndDelete({ _id: counterparty_contract_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_counterparty_contract_count(req, res){
        let counterparty_contract_count = null;

        counterparty_contract_count = await Ref.CounterpartyContractModel.countDocuments({});

        this.send_success_response(res, { count: counterparty_contract_count});
    }
}

export default new CounterpartyContractView();