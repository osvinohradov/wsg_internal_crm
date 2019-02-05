import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// Населені пункти
const UserSchema = new Schema({    
    first_name:             { type: String, required: true },
    last_name:              { type: String, required: true },

    updated_at:             { type: Date, default: Date.now() },
    created_at:             { type: Date, default: Date.now() }
}, { collection: 'users' });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;