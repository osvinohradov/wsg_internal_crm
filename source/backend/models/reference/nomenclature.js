import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Номенклатура
const NomenclatureSchema = new Schema({
    nomenclature_group_id:  { 
                                type: Schema.Types.ObjectId,
                                ref: 'NomenclatureGroupModel',
                                default: null
                            },                                  // Група Номенлатури
    name_short:             { type: String, default: '' },      // Коротка назва
    name_full:              { type: String, default: '' },      // Повна назва
    article:                { type: String, default: '' },      // Артикул

    service:                { type: Boolean, default: false },  // Послуга
    transport_service:      { type: Boolean, default: false },  // Транспортна послуга
    reporting_bank:         { type: Boolean, default: false },  // Банк суворої звітності
    nominal_cost:           { type: Boolean, default: false },  // Враховується по номінальній вартості
    base_unit_id:           { 
                                type: Schema.Types.ObjectId,
                                ref: 'UnitClassifierModel',
                                default: null
                            },                                  // Базова одиниця виміру
    rate_of_mpe:            { type: String, default: '' },      // Ставка ПДВ (пеерчислення: 0%, 20%, 7%, Без ПДВ, Не ПДВ)
    mpe_privilege:          { type: String, default: '' },      // Льгота з ПДВ
    pn_code:                { type: String, default: '' },      // Код ПН (по умовчю)
    long_expression:        { type: Boolean, default: false },  // Вимірюєтья тільки в сумовому виразі
    invoice_count:          { type: String, default: '' },      // Текст для друка у колонці кількість податкової Накладної
    embezzlement_id:        { 
                                type: Schema.Types.ObjectId, 
                                ref: 'EmbezzlementModel',
                                default: null
                            },                                  // Стаття витрат (посилання на статтю)

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_nomenclature' });

// Групи номенклатури
const NomenclatureGroupSchema = new Schema({
    name:       { type: String },           // Найменування номенклатури

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_nomenclature_groups' });

// Статті витрат
const EmbezzlementSchema = new Schema({
    name:       { type: String },           // Найменування статі витрат

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_embezzlements' });

const NomenclatureModel = mongoose.model('NomenclatureModel', NomenclatureSchema);
const NomenclatureGroupModel = mongoose.model('NomenclatureGroupModel', NomenclatureGroupSchema);
const EmbezzlementModel = mongoose.model('EmbezzlementModel', EmbezzlementSchema);


export {
    NomenclatureModel,
    NomenclatureGroupModel,
    EmbezzlementModel
}