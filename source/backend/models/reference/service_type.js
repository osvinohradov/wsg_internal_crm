const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Види сервісів
const ReferenceServiceTypeSchema = new Schema({
    // 
    Number        :{ type: String },


    // Найменування
    Name        :{ type: String },
    // Постачальник (посилання на Контрагентів)
    ProviderId     :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Додатковий постачальник (посилання на Контрагентів)
    AdditionalProviderId     :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Каталог номенклатури (посилання на Номенклатура)
    NomenclatureCatalogId     :{ type: Schema.Types.ObjectId, ref: 'ReferenceNomenclatureGroup' },
    // Коротке найменування квитка
    TicketShortName    :{ type: String },
    // Повне найменування квитка
    TicketFullName    :{ type: String },
    // Підлегла номенклатура (як послуга)
    NomenclatureAsServiceId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceNomenclature' },
    // Основні послуги
    MainServices  :{ type: String },
    // Послуги агенства
    AgencyServices  :{ type: String },
    // Інші сервіси
    OtherServices  :{ type: String },
    // Штрафні санкції
    Forfeit    :{ type: Number },
    // Ставка ПДВ (перечисление возможно из обмена валют)
    MPE   :{ type: Number }
});

const ReferenceServiceType = mongoose.model('ReferenceServiceType', ReferenceServiceTypeSchema);

exports.ReferenceServiceType = ReferenceServiceType;