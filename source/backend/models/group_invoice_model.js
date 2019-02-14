const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupInvoiceSchema = new Schema({
    // Номер
    number:             { type: Number, default: 0 },
    // 
    group_name:         { type: String, required: true },
    // Дата
    date:               { type: Date },
    organization_id:    { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
    is_paid:            { type: Boolean, default: false }, // Сплачено
    client_id:          { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty', default: null  },// Клієнт (посилання на Контрагентів)
    payment_form:       { type: String, default: 'Готівка' }, // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
    payment_date:       { type: Date, default: null }, // Дата сплати
    service_date:       { type: Date, default: null },
    checking_account_id:{ type: Schema.Types.ObjectId, ref: 'ReferenceCheckingAccount' },
    total_currency:     { type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    total_amount:       { type: Number, default: 0 },
    content:            { type: String, default: '' },
    comment:            { type: String, default: '' },// Коментар
    curator_id:         { type: Schema.Types.ObjectId, ref: 'ReferenceCurator', default: null },
    responsible_agent_id:  { type: Schema.Types.ObjectId, ref: 'User' },
    agent_id:              { type: Schema.Types.ObjectId, ref: 'User' }, // Агент (посилання на Користувачі)
    is_void:            { type: Boolean, default: false },
    general_checking_account:               { type: Boolean, default: false },
    content_of_general_checking_account:    { type: String, default: '' },


    updated_at          :{ type: Date, default: Date.now() },
    created_at          :{ type: Date, default: Date.now() },
}, { collection: 'group_invoices'});




GroupInvoiceSchema.statics.get_group_invoices_names = async function(group_invoice_name, options={}){
    
    let query = group_invoice_name ? 
                    { group_name: new RegExp(`^${group_invoice_name}$`, 'i') } :
                    {};

    let invoices = GroupInvoiceModel.find(query, '_id group_name', options);
    return invoices;
}

const GroupInvoiceModel = mongoose.model('GroupInvoice', GroupInvoiceSchema);

export default GroupInvoiceModel;