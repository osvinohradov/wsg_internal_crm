const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Авіа компанії
const ReferenceAviaCompanySchema = new Schema({
    // Номер
    Number  :{ type: String },
    // Найменування
    Name    :{ type: String },
    //
    Code    :{ type: String },
    // IATA
    IATA    :{ type: String }
});

const ReferenceAviaCompany = mongoose.model('ReferenceAviaCompany', ReferenceAviaCompanySchema);

exports.ReferenceAviaCompany = ReferenceAviaCompany;