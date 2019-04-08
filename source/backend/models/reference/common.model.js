// Installed packages
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CounterpartyGeneralSchema = new Schema({
    // Фіз./Юр. особа (enumerate [Фізична особа, Юридична особа])
    person :{ type: String },
    // Не є резидентом
    is_resident :{ type: Boolean },
    // Повне найменування
    full_name :{ type: String },
    // Група (посилання на групу контрагентів)
    group_id :{ type: Schema.Types.ObjectId, ref: 'CounterpartyGroupModel' },
    // Головний контрагент (Посилання на групу контрагентів)
    main_counterparty :{ type: Schema.Types.ObjectId, ref: 'CounterpartyModel' },
    // Основний договір (посилання Договори контрагентів)
    main_contract :{ type: Schema.Types.ObjectId, ref: 'CounterpartyContractModel' },
    // Основний бануівській рахунок (посилання на Банківські рахунки)
    bank_account :{ type: Schema.Types.ObjectId, ref: 'CheckingAccountModel' }
}, { _id: false });

const CounterpartyOthersSchema = new Schema({
     // ІПН
     ipn         :{ type: String },
     // Код ЕДРПОУ
     EDRPOUCode  :{ type: String },
     // Паспорт 
     passport    :{ type: String },
     // Номер свідотства ПДВ
     mpe_certificate    :{ type: String },
     // Виділити послуги агенства
     agency_services    :{ type: Boolean }
}, { _id: false });





export {
    CounterpartyGeneralSchema,
    CounterpartyOthersSchema
}