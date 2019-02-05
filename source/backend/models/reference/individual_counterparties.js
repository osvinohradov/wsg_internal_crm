import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Фізичні особи контрагентів
const ReferenceIndividualCounterpartiesSchema = new Schema({
   
    last_name_eng:          { type: String, default: '' },          // Прізвище (стандарт)
    first_name_eng:         { type: String, default: '' },          // Ім'я (стандарт)
    middle_name_eng:        { type: String, default: '' },          // По-батькові (стандарт)
    last_name_native:       { type: String, default: '' },          // Прізвище (місцеве)
    first_name_native:      { type: String, default: '' },          // Ім'я (місцеве)
    middle_name_native:     { type: String, default: '' },          // По-батькові (місцеве)
    organization:           { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },         // Організація 
    birthday:               { type: Date },                         // Дата народження
    ipn:                    { type: String, default: '' },          // ИПН
    born_country:           { type: String, default: '' },          // Країна народження
    comment:                { type: String, default: '' },          // Коментар
    passport_ids:           { type: [Schema.Types.ObjectId], ref: 'ReferenceIndividualCounterpartiesPassport' },            // Паспортні данні
    email :                 { type: String, default: '' },                       // поштова скринька
    telephone:              { type: String, default: '' },                       // Телефон
    cellphone:              { type: String, default: '' },                       // Мобільний
    fax:                    { type: String, default: '' },                       // Факс
    address:                { type: String, default: '' },                       // Адреса
    delivery_address:       { type: String, default: '' },                       // Адреса доставки
    post_index:             { type: String, default: '' },                       //Поштовий індекс

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_individual_counterparty' });

const ReferenceIndividualCounterpartiesPassportSchema = new Schema({
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

const ReferenceIndividualCounterpartiesModel = mongoose.model('ReferenceIndividualCounterparties', ReferenceIndividualCounterpartiesSchema);
const ReferenceIndividualCounterpartiesPassportModel = mongoose.model('ReferenceIndividualCounterpartiesPassport', ReferenceIndividualCounterpartiesPassportSchema);

export {
    ReferenceIndividualCounterpartiesModel,
    ReferenceIndividualCounterpartiesPassportModel
}