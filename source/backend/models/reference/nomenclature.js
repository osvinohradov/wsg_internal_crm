const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Номенклатура
const ReferenceNomenclatureSchema = new Schema({
    // Група Номенлатури
    NomenclatureGroupId   :{ type: Schema.Types.ObjectId, ref: 'ReferenceNomenclatureGroup' },
    // Коротка назва
    NameShort            :{ type: String },
    // Повна назва
    NameFull            :{ type: String },
    // Артикул
    Article            :{ type: String },
    // Послуга
    Service :{ type: Boolean },
    // Транспортна послуга
    TransportService :{ type: Boolean },
    // Банк суворої звітності
    ReportingBank :{ type: Boolean },
    // Враховується по номінальній вартості
    NominalCost :{ type: Boolean },
    // Базова одиниця виміру
    BaseUnitId :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    // Ставка ПДВ (пеерчислення: 0%, 20%, 7%, Без ПДВ, Не ПДВ)
    RateOfMPE :{ type: String },
    // Льгота з ПДВ
    MPEPrivilege :{ type: String },
    // Код ПН (по умовчю)
    PNCode :{ type: String },
    // Вимірюєтья тільки в сумовому виразі
    LongExpression :{ type: Boolean },
    // Текст для друка у колонці кількість податкової Накладної
    InvoiceCount :{ type: String },
    // Стаття витрат (посилання на статтю)
    EmbezzlementId :{ type: Schema.Types.ObjectId, ref: 'ReferenceEmbezzlement' }
});

// Групи номенклатури
const ReferenceNomenclatureGroupSchema = new Schema({
    // Найменування номенклатури
    Name            :{ type: String }
});

// Статті витрат
const ReferenceEmbezzlementSchema = new Schema({
    // Найменування статі витрат
    Name            :{ type: String }
});

// Класифікатор одиниць виміру
const ReferenceUnitClassifierSchema = new Schema({
    // Найменування класифікатору одиниць виміру
    Name            :{ type: String }
});


const ReferenceNomenclature = mongoose.model('ReferenceNomenclature', ReferenceNomenclatureSchema);
const ReferenceNomenclatureGroup = mongoose.model('ReferenceNomenclatureGroup', ReferenceNomenclatureGroupSchema);
const ReferenceEmbezzlement = mongoose.model(' ReferenceEmbezzlement', ReferenceEmbezzlementSchema);
const ReferenceUnitClassifier = mongoose.model(' ReferenceUnitClassifier', ReferenceUnitClassifierSchema);

exports.ReferenceNomenclature = ReferenceNomenclature;
exports.ReferenceNomenclatureGroup = ReferenceNomenclatureGroup;
exports.ReferenceEmbezzlement = ReferenceEmbezzlement;
exports.ReferenceUnitClassifier = ReferenceUnitClassifier;