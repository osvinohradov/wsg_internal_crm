import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const OrganizationSchema = new Schema({
    name:       { type: String, default: '' },  // Найменування

    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'organizations' });


OrganizationSchema.statics.get_organizations_names = async function(organization_name, options={}){
    
    let query = organization_name ? 
                    { name: new RegExp(`${organization_name}`, 'i') } :
                    {};

    let organizations = OrganizationModel.find(query, '_id name', options);
    return organizations;
}


const OrganizationModel = mongoose.model('OrganizationModel', OrganizationSchema);

export {
    OrganizationModel
}