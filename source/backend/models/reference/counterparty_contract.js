import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Авіа компанії
const ReferenceCounterpartyContractSchema = new Schema({
    name:       { type: String, default: '' },
    code:       { type: String, default: '' },
    iata:       { type: String, default: '' },  // IATA

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_counterparty_contracts' });

const ReferenceCounterpartyContractModel = mongoose.model('ReferenceCounterpartyContract', ReferenceCounterpartyContractSchema);

export {
    ReferenceCounterpartyContractModel
}