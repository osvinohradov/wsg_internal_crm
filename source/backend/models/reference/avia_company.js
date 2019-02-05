import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Авіа компанії
const ReferenceAviaCompanySchema = new Schema({
    name:       { type: String, default: '', required: true },
    code:       { type: String, default: '', required: true },
    iata:       { type: String, default: '', required: true }, // IATA

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_avia_companies' });

const ReferenceAviaCompanyModel = mongoose.model('ReferenceAviaCompany', ReferenceAviaCompanySchema);

export {
    ReferenceAviaCompanyModel
}