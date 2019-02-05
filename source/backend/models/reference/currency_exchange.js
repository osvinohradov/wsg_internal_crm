import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Обмін валют
const ReferenceCurrencyExchangeSchema = new Schema({
    name:           { type: String, default: '', required: true },  // Найменування
    coefficient:    { type: Number, default: 0 },  // Коефіцієнт

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_currency_exchanges' });

const ReferenceCurrencyExchangeModel = mongoose.model('ReferenceCurrencyExchangeModel', ReferenceCurrencyExchangeSchema);

export {
    ReferenceCurrencyExchangeModel
}