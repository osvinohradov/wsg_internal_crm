import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Населені пункти
const CitySchema = new Schema({    
    station_code:   { type: String, default: '' },
    name_rus:       { type: String, default: '' },  // Повна назва російською
    name_eng:       { type: String, default: '' },  // Повна назва англійською
    name_ukr:       { type: String, default: '' },  // Повна назва українською

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_city' });

const CityModel = mongoose.model('CityModel', CitySchema);

export {
    CityModel
}