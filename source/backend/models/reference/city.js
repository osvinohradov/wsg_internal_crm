const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Населені пункти
const ReferenceCitySchema = new Schema({
    // Найменування
    Name            :{ type: String },
    // Код
    Code            :{ type: String },
    // Повна назва російською
    NameRus         :{ type: String },
    // Повна назва англійською
    NameEng         :{ type: String },
    // Повна назва українською
    NameUkr         :{ type: String },
    // Код станції
    StationCode     :{ type: Number }
});

const ReferenceCity = mongoose.model('ReferenceCity', ReferenceCitySchema);

exports.ReferenceCity = ReferenceCity;