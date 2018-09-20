const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Куратори
const ReferenceCuratorSchema = new Schema({
    // Найменування
    Name            :{ type: String },
    // Клієнт (посилання на контагентів)
    Client            :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' }
});

const ReferenceCurator = mongoose.model('ReferenceCurator', ReferenceCuratorSchema);

exports.ReferenceCurator = ReferenceCurator;