import { BaseView, Exception } from '../../lib';
import { Ref } from '../../models';
import { generate_random_number } from '../../helpers';


class RefAirportView extends BaseView{
    constructor(){
        super();
    }

    async get_airports(req, res){
        let airports = null;
        let skip = 0;
        let limit = 10;
        try{
            airports = await Ref.ReferenceAirportModel.find({}).skip(skip).limit(10);

            this.send_success_response(res, 200, airports);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, 404, null);
        }
    }

    async get_airport(req, res){
        let airport_id = req.params.id;
        try{
            let airport = await Ref.ReferenceAirportModel.findOne({ _id: airport_id});

            this.send_success_response(res, 200, airport);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response(res, 404, null);
        }
    }

    // async get_
}

export default new RefAirportView();