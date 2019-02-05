import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Куратори
const ReferenceCuratorSchema = new Schema({
    name:       { type: String, default: '' },  // Найменування
    client_id:  { type: Schema.Types.ObjectId, ref: 'ReferenceCounterpartyModel' },     // Клієнт (посилання на контагентів)

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_curators' });

const ReferenceCuratorModel = mongoose.model('ReferenceCuratorModel', ReferenceCuratorSchema);

export {
    ReferenceCuratorModel
}