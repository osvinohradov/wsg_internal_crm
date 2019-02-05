import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Аеропорти
const CheckingAccountSchema = new Schema({
    name:                       { type: String, required: true },
    owner:                      { type: String }, // counterparty or organizations
    checking_account_number:    { type: String, default: ''},
    bank_name:                  { 
                                    type: Schema.Types.ObjectId, 
                                    ref: 'ReferenceBank',
                                    default: null
                                }, // BankModel
    bank_paid_delete:           {
                                    type: Schema.Types.ObjectId, 
                                    ref: 'ReferenceBank',
                                    default: null
                                }, // Bank Model
    text_corespondent_delete:   { type: String, default: '' },
    text:                       { type: String, default: '' },
    paid_type:                  { type: String, default: '' },
    currency:                   {
                                    type: Schema.Types.ObjectId, 
                                    ref: 'ReferenceUnitClassifier',
                                    default: null
                                }, // Unit clisifier
    number_date_access:         { type: String, default: '' },
    opened_date:                { type: Date },
    closed_date:                { type: Date },

    updated_at:                 { type: Date, default: Date.now() },
    created_at:                 { type: Date, default: Date.now() }
}, { collection: 'ref_checking_account' });

const BankSchema = new Schema({
    name:                       { type: String },
    bancking_element:           { type: String },  // some reference
    corp_number:                { type: String },
    city:                       { type: String },
    address:                    { type: String },
    telephone:                  { type: String },
    edrpou_code:                { type: String },

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_banks' });

const CheckingAccountModel = mongoose.model('ReferenceCheckingAccount', CheckingAccountSchema);
const BankModel = mongoose.model('ReferenceBank', BankSchema);

export {
    CheckingAccountModel,
    BankModel
}