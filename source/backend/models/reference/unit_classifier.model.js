import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Класифікатор одиниць виміру
const UnitClassifierSchema = new Schema({
    name:       { type: String },// Найменування класифікатору одиниць виміру

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'ref_unit_classifier' });

UnitClassifierSchema.statics.get_unit_classifiers_names = async function(unit_classifier_name, options={}){
    
    let query = unit_classifier_name ? 
                    { name: new RegExp(`${unit_classifier_name}`, 'i') } :
                    {};

    let unit_classifier = UnitClassifierModel.find(query, '_id name', options);
    return unit_classifier;
}

const UnitClassifierModel = mongoose.model('UnitClassifierModel', UnitClassifierSchema);

export { 
    UnitClassifierModel
}