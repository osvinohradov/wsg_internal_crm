import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Куратори
const CuratorSchema = new Schema({
    name:       { type: String, default: '' },  // Найменування
    client_id:  { type: Schema.Types.ObjectId, ref: 'CounterpartyModel' },     // Клієнт (посилання на контагентів)

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_curators' });


CuratorSchema.statics.get_curators_names = async function(curator_name, options={}){
    
    let query = curator_name ? 
                    { name: new RegExp(`${curator_name}`, 'i') } :
                    {};

    let curator = ReferenceCuratorModel.find(query, '_id name', options);
    return curator;
}


const CuratorModel = mongoose.model('CuratorModel', CuratorSchema);

export {
    CuratorModel
}