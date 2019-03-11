import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Обмін валют
const CurrencyExchangeSchema = new Schema({
    name:           { type: String, default: '', required: true },  // Найменування
    coefficient:    { type: Number, default: 0 },  // Коефіцієнт

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_currency_exchanges' });

const CurrencyExchangeModel = mongoose.model('CurrencyExchange', CurrencyExchangeSchema);

export {
    CurrencyExchangeModel
}