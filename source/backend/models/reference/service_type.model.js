import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Види сервісів
const ServiceTypeSchema = new Schema({
    name:                       { type: String, required: true },           // Найменування
    provider_id:                {   
                                    type: Schema.Types.ObjectId,
                                    ref: 'ReferenceCounterparty',
                                    default: null
                                },                                          // Постачальник (посилання на Контрагентів)
   
    additional_provider_id:     { 
                                    type: Schema.Types.ObjectId,
                                    ref: 'ReferenceCounterparty',
                                    default: null
                                },                                          // Додатковий постачальник (посилання на Контрагентів)
   
    nomenclature_catalog_id:    {
                                    type: Schema.Types.ObjectId,
                                    ref: 'ReferenceNomenclatureGroup',
                                    default: null
                                },                                          // Каталог номенклатури (посилання на Номенклатура)
    ticket_short_name:          { type: String, default: '' },              // Коротке найменування квитка
    ticket_full_name:           { type: String, default: '' },              // Повне найменування квитка
   
    nomenclature_as_service_id: { 
                                    type: Schema.Types.ObjectId, 
                                    ref: 'ReferenceNomenclature',
                                    default: null
                                },                                          // Підлегла номенклатура (як послуга)
    
    main_services:              { type: String, default: '' },              // Основні послуги
    agency_services:            { type: String, default: '' },              // Послуги агенства
    other_services:             { type: String, default: '' },              // Інші сервіси
    forfeit:                    { type: Number, default: 0 },               // Штрафні санкції
    mpe:                        { type: Number, default: 0 },               // Ставка ПДВ (перечисление возможно из обмена валют)

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, {collection: 'ref_service_types' });


ServiceTypeSchema.statics.get_service_types_names = async function(service_type_name, options={}){
    
    let query = service_type_name ? 
                    { name: new RegExp(`${service_type_name}`, 'i') } :
                    {};

    let service_types = await ReferenceServiceTypeModel.find(query, '_id name', options);
    return service_types;
}


const ServiceTypeModel = mongoose.model('ServiceType', ServiceTypeSchema);

export {
    ServiceTypeModel
}