import { References } from '../models';
import { ref } from '../controllers';
const railway_stations = require('../zhd_station_code.json');

async function parse_railway_station(data){
    console.log('Data lenght: ', data.length);
    for (let i = 0; i < data.length; i++) {
        let elem = data[i];

        let ru_code = elem['rus_code'] || '';

        let rus_station = await References.RailwayStationModel.findOne({ station_code: ru_code });
        if(!rus_station){
            let station = new References.RailwayStationModel({
                station_code: ru_code,
                name_rus: elem['RU'] || ''
            });
            await station.save();
        }
        else{
            await References.RailwayStationModel.updateOne({ _id: rus_station._id }, { $set: { name_rus: elem['RU'] } });
        }

        let ukr_code = elem['ukr_code'] || '';
        let ukr_station = await References.RailwayStationModel.findOne({ station_code: ukr_code });
        if(!ukr_station){
            let station = new References.RailwayStationModel({
                station_code: ukr_code,
                name_ukr: elem['UA'] || ''
            });
            await station.save();
        }
        else{
            await References.RailwayStationModel.updateOne({ _id: ukr_station._id }, { $set: { ukr_station: elem['UA'] } });
        }

    }
}

console.log('Start parsing railway station')
//parse_railway_station(railway_stations);