import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Контрагенти
const CounterpartySchema = new Schema({
    name:               { type: String, default: '' },        // Найменування
    general:            { type: {
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
    individuals_id :    { type: [Schema.Types.ObjectId], ref: 'IndividualCounterpartyModel' },    // Фізичні особи (посилання на Фізичні особи) Потрібні поля: (Фізична особа, Коментар)
    services:           { type: [{
                                // Послуга (посилання на Види сервісів)
                                service_id         :{ type: Schema.Types.ObjectId, ref: 'ServiceTypeModel' },
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

    checking_accounts_ids:      { type: [Schema.Types.ObjectId], ref: 'CheckingAccountModel', default: [] },
    counterparty_contracts_ids: { type: [Schema.Types.ObjectId], ref: 'CounterpartyContractsModel', default: [] },

    updated_at:         { type: Date, default: Date.now() },
    created_at:         { type: Date, default: Date.now() }
}, { collection: 'ref_counterparties' });


CounterpartySchema.statics.get_counterparties_names = async function(counterparty_name, options={}){
    
    let query = counterparty_name ? 
                    { name: new RegExp(`${counterparty_name}`, 'i') } :
                    {};
console.log(query)
    let counterparties = CounterpartyModel.find(query, '_id name', options);
    return counterparties;
}

// Групи контрагентів
const CounterpartyGroupSchema = new Schema({
    name:               { type: String },   // Найменування групи

    updated_at:         { type: Date, default: Date.now() },
    created_at:         { type: Date, default: Date.now() }
}, { collection: 'ref_counterparties_groups' });

const CounterpartyModel = mongoose.model('CounterpartyModel', CounterpartySchema);
const CounterpartyGroupModel = mongoose.model('CounterpartiesGroupModel', CounterpartyGroupSchema);

export {
    CounterpartyModel,
    CounterpartyGroupModel
}
