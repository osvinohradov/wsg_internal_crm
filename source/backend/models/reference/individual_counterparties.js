const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Фізичні особи контрагентів
const ReferenceIndividualCounterpartiesSchema = new Schema({
    // Прізвище (стандарт)
    LastNameEng            :{ type: String },
    // Ім'я (стандарт)
    FirstNameEng            :{ type: String },
    // По-батькові (стандарт)
    MiddleNameEng          :{ type: String },
    // Прізвище (місцеве)
    LastNameNative            :{ type: String },
    // Ім'я (місцеве)
    FirstNameNative            :{ type: String },
    // По-батькові (місцеве)
    MiddleNameNative            :{ type: String },
    // Організація 
    Organisation            :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Дата народження
    Birthday            :{ type: Date },
    // ИПН
    IPN            :{ type: String },
    // Країна народження
    BornCountry            :{ type: String },
    // Коментар
    Comment            :{ type: String },
    // Паспортні данні
    PassportIds            :{ type: [Schema.Types.ObjectId], ref: 'ReferenceIndividualCounterpartiesPassport' },
    // поштова скринька
    Email :{ type: String },
    // Телефон
    Telephone :{ type: String },
    // Мобільний
    Cellphone :{ type: String },
    // Факс
    Fax :{ type: String },
    // Адреса
    Address :{ type: String },
    // Адреса доставки
    DeliveryAddress : { type: String },
    //Поштовий індекс
    PostIndex : { type: String }

});

const ReferenceIndividualCounterpartiesPassportSchema = new Schema({
    // Серія та номер паспорту
    PassportNumber            :{ type: String },
    // Прізвище
    LastName            :{ type: String },
    // Ім'я
    FirstName            :{ type: String },
    // Дата видачі
    ProductionDate          :{ type: String },
    // Ким випущенний
    Organinization            :{ type: String },
    // Країна
    Country            :{ type: String },
    // Національність
    Nationality            :{ type: String }

});

const ReferenceIndividualCounterparties = mongoose.model('ReferenceIndividualCounterparties', ReferenceIndividualCounterpartiesSchema);
const ReferenceIndividualCounterpartiesPassport = mongoose.model('ReferenceIndividualCounterpartiesPassport', ReferenceIndividualCounterpartiesPassportSchema);

exports.ReferenceIndividualCounterparties = ReferenceIndividualCounterparties;
exports.ReferenceIndividualCounterpartiesPassport = ReferenceIndividualCounterpartiesPassport;