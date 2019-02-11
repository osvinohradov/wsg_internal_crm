import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Аеропорти
const RefRailwayStationSchema = new Schema({
    station_code:   { type: String, default: '' },
    name_rus:       { type: String, default: '' },      // Найменування на російській
    name_eng:       { type: String, default: '' },      // Найменування на англійській
    name_ukr:       { type: String, default: '' },      // Найменування на українській
    place_rus:      { type: String, default: '' },      // Місце на російській
    place_eng:      { type: String, default: '' },      // Місце на англійській
    place_ukr:      { type: String, default: '' },      // Місце на українській
    country_rus:    { type: String, default: '' },      // Країна на російській
    country_eng:    { type: String, default: '' },      // Країна на англійській
    country_ukr:    { type: String, default: '' },      // Країна на українській
    latitude:       { type: Number, default: 0 },
    longitude:      { type: Number, default: 0 },

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_railways_stations' });


RefRailwayStationSchema.statics.get_railway_stations_names = function(railway_station_name, options={}){

    let regexp = railway_station_name ? new RegExp(`.*${railway_station_name}.*`, 'i') : ''
    
    let query = railway_station_name ? 
        { $and: [{ name_ukr: regexp }, { name_ukr: { $exists: true } } ] } :
        {};
    console.log('Find name:', query)

    let railway_stations = RefRailwayStationModel.find(query, '_id name_ukr name_rus name_eng', options);
    return railway_stations;
}



const RefRailwayStationModel = mongoose.model('RefRailwayStationModel', RefRailwayStationSchema);

export {
    RefRailwayStationModel
}