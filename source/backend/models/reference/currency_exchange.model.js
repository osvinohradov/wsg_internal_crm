import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Обмін валют
const CurrencyExchangeSchema = new Schema({
    name:           { type: String, default: '', required: true },  // Найменування
    coefficient:    { type: Number, default: 0 },  // Коефіцієнт

    updated_at:     { type: Date, default: Date.now() },
    created_at:     { type: Date, default: Date.now() }
}, { collection: 'ref_currency_exchanges' });

CurrencyExchangeSchema.statics.get_currency_exchange_names = async function(currency_exchange_name, options={}){
    
    let query = currency_exchange_name ? 
                    { name: new RegExp(`${currency_exchange_name}`, 'i') } :
                    {};

    let currency_exchange = CurrencyExchangeModel.find(query, '_id name', options);
    return currency_exchange;
}

const CurrencyExchangeModel = mongoose.model('CurrencyExchangeModel', CurrencyExchangeSchema);

export {
    CurrencyExchangeModel
}