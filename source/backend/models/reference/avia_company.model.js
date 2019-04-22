import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Авіа компанії
const AviaCompanySchema = new Schema({
    name:       { type: String, default: '', required: true },
    code:       { type: String, default: '', required: true },
    iata:       { type: String, default: '', required: true }, // IATA

    // Service fields
    is_deleted: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_avia_companies' });

const AviaCompanyModel = mongoose.model('AviaCompanyModel', AviaCompanySchema);

export {
    AviaCompanyModel
}