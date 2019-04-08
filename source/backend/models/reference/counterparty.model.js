// Installed packages
import mongoose from 'mongoose';

// Internal packages
import { CounterpartyGeneralSchema } from './common.model';

const Schema = mongoose.Schema;



// Контрагенти
const CounterpartySchema = new Schema({
    name:               { type: String, default: 'New Counterparty' },        // Найменування
    general:            { type: CounterpartyGeneralSchema, default: null }, // Загальні
    other:              { type: CounterpartyOthersSchema, default: null },    // Інші
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
    counterparty_contracts_ids: { type: [Schema.Types.ObjectId], ref: 'CounterpartyContractModel', default: [] },

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
