import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Населені пункти
const UserSchema = new Schema({    
    first_name:             { type: String, required: true },
    last_name:              { type: String, required: true },

    updated_at:             { type: Date, default: Date.now() },
    created_at:             { type: Date, default: Date.now() }
}, { collection: 'users' });


UserSchema.statics.get_users_names = async function(user_name, options={}){
    
    let query = user_name ? 
                    { $or: [
                        { first_name: new RegExp(`${user_name}`, 'i') },
                        { last_name: new RegExp(`${user_name}`, 'i') }
                    ] } :
                    {};

    let usres = UserModel.find(query, '_id first_name last_name', options);
    return usres;
}


const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;