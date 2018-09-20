const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Аеропорти
const ReferenceAirportSchema = new Schema({
    _id         :{ type: mongoose.SchemaTypes.ObjectId },
    // Код
    Code        :{ type: String },
    // Найменування
    Name        :{ type: String },
    // Найменування на російській
    NameRus     :{ type: String },
    // Найменування на англійській
    NameEng     :{ type: String },
    // Найменування на українській
    NameUkr     :{ type: String },
    // Місце на російській
    PlaceRus    :{ type: String },
    // Місце на англійській
    PlaceEng    :{ type: String },
    // Місце на українській
    PlaceUkr    :{ type: String },
    // Країна на російській
    CountryRus  :{ type: String },
    // Країна на англійській
    CountryEng  :{ type: String },
    // Країна на українській
    CountryUkr  :{ type: String },
    //
    latitude    :{ type: Number },
    //
    longitude   :{ type: Number }
});

const ReferenceAirport = mongoose.model('ReferenceAirports', ReferenceAirportSchema);

exports.ReferenceAirport = ReferenceAirport;