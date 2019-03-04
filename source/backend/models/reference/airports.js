// Built-in packages
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Аеропорти
const AirportSchema = new Schema({
    name:           { type: String, required: [true, 'Не задано код аеропорту.'] },
    name_ukr:       { type: String, required: [true, 'Не задано ім\'я аеропорту на українській мові.'] },      // Найменування на українській
    name_rus:       { type: String, default: '' },      // Найменування на російській
    name_eng:       { type: String, default: '' },      // Найменування на англійській
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
}, { collection: 'ref_airports' });

const AirportModel = mongoose.model('Airport', AirportSchema);

export {
    AirportModel
}