import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';

// TODO: Involve validator to each handler
class AirportView extends BaseView{
    constructor(){
        super();
    }

    async get_airports(req, res){
        let airports = null;
        let skip = 0;
        let limit = 10;
        try{
            airports = await Ref.AirportModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, airports);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async get_airport(req, res){
        let airport_id = req.params.id;
        try{
            let airport = await Ref.AirportModel.findOne({ _id: airport_id});

            this.send_success_response(res, airport);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, null, 404);
        }
    }

    async create_airport(req, res){
        let airport = req.body;

        airport = new Ref.AirportModel(airport);
        let is_invalid = airport.validateSync();
        if(is_invalid){
            // TODO: Return error
            console.log(is_invalid);
            this.send_error_response(res, is_invalid.errors, 404);
            return;
        }

        airport = await airport.save();

        this.send_success_response(res, airport);
    }

    async update_aiprport(req, res){
        let airport_id = req.params.id;
        let airport = req.body;

        // TODO: Validate body
        airport = await Ref.AirportModel.findOneAndUpdate({ _id: airport_id }, airport, { new: true });

        console.log(airport)
        this.send_success_response(res, airport);
    }

    async delete_airport(req, res){
        let airport_id = req.params.id;

        let deleted = await Ref.AirportModel.findOneAndDelete({ _id: airport_id });
        // TODO: Send status
        this.send_success_response(res, {});
    }

    async get_airports_count(req, res){
        let airport_count = null;

        airport_count = await Ref.AirportModel.countDocuments({});

        this.send_success_response(res, { count: airport_count});
    }
}

export default new AirportView();