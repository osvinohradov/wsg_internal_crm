import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const IndividualCounterpartyPassportSchema = new Schema({
    passport_number:    { type: String, default: '' },          // Серія та номер паспорту
    last_name:          { type: String, default: '' },          // Прізвище
    first_name:         { type: String, default: '' },          // Ім'я
    production_date:    { type: String, default: '' },          // Дата видачі
    organinization:     { type: String, default: '' },          // Ким випущенний
    country:            { type: String, default: '' },          // Країна
    nationality:        { type: String, default: '' },          // Національність

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_individual_counterparty_passports' });

const IndividualCounterpartyPassportModel = mongoose.model('IndividualCounterpartyPassportModel', IndividualCounterpartyPassportSchema);

export {
    IndividualCounterpartyPassportModel
}