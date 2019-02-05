import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Контрагенти
const ReferenceCounterpartySchema = new Schema({
    name:               { type: String, default: '' },        // Найменування
    general:            { type: {
                                // Фіз./Юр. особа (enumerate [Фізична особа, Юридична особа])
                                person :{ type: String },
                                // Не є резидентом
                                is_resident :{ type: Boolean },
                                // Повне найменування
                                full_name :{ type: String },
                                // Група (посилання на групу контрагентів)
                                group_id :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartiesGroup' },
                                // Головний контрагент (Посилання на групу контрагентів)
                                main_counterparty :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
                                // Основний договір (посилання Договори контрагентів)
                                main_contract :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartyContracts' },
                                // Основний бануівській рахунок (посилання на Банківські рахунки)
                                bank_account :{ type: Schema.Types.ObjectId, ref: 'ReferenceCheckingAccount' }
                            } 
                        }, // Загальні
    other:              { type: {
                                // ІПН
                                ipn         :{ type: String },
                                // Код ЕДРПОУ
                                EDRPOUCode      :{ type: String },
                                // Паспорт 
                                passport        :{ type: String },
                                // Номер свідотства ПДВ
                                mpe_certificate         :{ type: String },
                                // Виділити послуги агенства
                                agency_services  :{ type: Boolean }
                            }
                        },    // Інші
    contacts:           { type: [{
                                // Тип (перелік Адреса, Телефон, Адреса електронної пошти, Веб сторінка, Інше)
                                contact_type     :{ type: String },
                                // Вид (поки що вручну)
                                type            :{ type: String },
                                // Представлення
                                representation  :{ type: String },
                            }]
                        },      // Контакти
    individuals_id :    { type: [Schema.Types.ObjectId], ref: 'ReferenceIndividualCounterparties' },    // Фізичні особи (посилання на Фізичні особи) Потрібні поля: (Фізична особа, Коментар)
    services:           { type: [{
                                // Послуга (посилання на Види сервісів)
                                service_id         :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
                                // Агентська винагорода
                                agent_awark        :{ type: Number },
                                // Процент банку
                                bank_percent       :{ type: Number }
                            }] 
                        },      // Послуги
    tourist_service:    { type: [{
                                // Послуга
                                name    :{ type: String }
                            }]
                        },
    comment:            { type: String, default: '' },  // Коментар

    checking_accounts_ids:      { type: [Schema.Types.ObjectId], ref: 'ReferenceCheckingAccount', default: [] },
    counterparty_contracts_ids: { type: [Schema.Types.ObjectId], ref: 'ReferenceCounterpartyContracts', default: [] },

    updated_at:         { type: Date, default: Date.now() },
    created_at:         { type: Date, default: Date.now() }
}, { collection: 'ref_counterparties' });

// Групи контрагентів
const ReferenceCounterpartiesGroupSchema = new Schema({
    name:               { type: String },   // Найменування групи

    updated_at:         { type: Date, default: Date.now() },
    created_at:         { type: Date, default: Date.now() }
}, { collection: 'ref_counterparties_groups' });

const ReferenceCounterpartyModel = mongoose.model('ReferenceCounterparty', ReferenceCounterpartySchema);
const ReferenceCounterpartiesGroupModel = mongoose.model('ReferenceCounterpartiesGroup', ReferenceCounterpartiesGroupSchema);

export {
    ReferenceCounterpartyModel,
    ReferenceCounterpartiesGroupModel
}
