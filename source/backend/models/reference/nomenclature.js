import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Номенклатура
const ReferenceNomenclatureSchema = new Schema({
    nomenclature_group_id:  { 
                                type: Schema.Types.ObjectId,
                                ref: 'ReferenceNomenclatureGroup',
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
                                ref: 'ReferenceUnitClassifier',
                                default: null
                            },                                  // Базова одиниця виміру
    rate_of_mpe:            { type: String, default: '' },      // Ставка ПДВ (пеерчислення: 0%, 20%, 7%, Без ПДВ, Не ПДВ)
    mpe_privilege:          { type: String, default: '' },      // Льгота з ПДВ
    pn_code:                { type: String, default: '' },      // Код ПН (по умовчю)
    long_expression:        { type: Boolean, default: false },  // Вимірюєтья тільки в сумовому виразі
    invoice_count:          { type: String, default: '' },      // Текст для друка у колонці кількість податкової Накладної
    embezzlement_id:        { 
                                type: Schema.Types.ObjectId, 
                                ref: 'ReferenceEmbezzlement',
                                default: null
                            },                                  // Стаття витрат (посилання на статтю)

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_nomenclature' });

// Групи номенклатури
const ReferenceNomenclatureGroupSchema = new Schema({
    name:       { type: String },           // Найменування номенклатури

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_nomenclature_groups' });

// Статті витрат
const ReferenceEmbezzlementSchema = new Schema({
    name:       { type: String },           // Найменування статі витрат

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_embezzlements' });

// Класифікатор одиниць виміру
const ReferenceUnitClassifierSchema = new Schema({
    name:       { type: String },// Найменування класифікатору одиниць виміру

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_unit_classifier' });

ReferenceUnitClassifierSchema.statics.get_unit_classifiers_names = async function(unit_classifier_name, options={}){
    
    let query = unit_classifier_name ? 
                    { name: new RegExp(`${unit_classifier_name}`, 'i') } :
                    {};

    let unit_classifier = ReferenceUnitClassifierModel.find(query, '_id name', options);
    return unit_classifier;
}



const ReferenceNomenclatureModel = mongoose.model('ReferenceNomenclature', ReferenceNomenclatureSchema);
const ReferenceNomenclatureGroupModel = mongoose.model('ReferenceNomenclatureGroup', ReferenceNomenclatureGroupSchema);
const ReferenceEmbezzlementModel = mongoose.model('ReferenceEmbezzlement', ReferenceEmbezzlementSchema);
const ReferenceUnitClassifierModel = mongoose.model('ReferenceUnitClassifier', ReferenceUnitClassifierSchema);

export {
    ReferenceNomenclatureModel,
    ReferenceNomenclatureGroupModel,
    ReferenceEmbezzlementModel,
    ReferenceUnitClassifierModel
}