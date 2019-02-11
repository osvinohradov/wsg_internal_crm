import { BaseView, Exception } from '../lib';
import { Ref } from '../models';
import { generate_random_number } from '../helpers';


class RefRailwayStationView extends BaseView{
    constructor(){
        super();
    }

    async get_railway_stations_names(req, res){
       let railway_stations = null;

       let railway_station_name = req.query.railway_station_name;

        try{
            railway_stations = await Ref.RefRailwayStationModel.get_railway_stations_names(railway_station_name, { limit: 10 });

            this.send_success_response(res, 200, railway_stations);
        }
        catch(err){
            console.log(err)
            // Сделать вывод информации об ошибке, а в будующем логировать все ошибки
            this.send_error_response();
        }
    }
}

export default new RefRailwayStationView();