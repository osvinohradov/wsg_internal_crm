const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Обмін валют
const ReferenceCurrencyExchangeSchema = new Schema({
    // Найменування
    Name            :{ type: String },
    // Коефіцієнт
    Сoefficient     :{ type: Number }
});

const ReferenceCurrencyExchange = mongoose.model('ReferenceCurrencyExchange', ReferenceCurrencyExchangeSchema);

exports.ReferenceCurrencyExchange = ReferenceCurrencyExchange;