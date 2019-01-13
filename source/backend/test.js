const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Model extends Schema{
    constructor(definition, options){
        super(definition, options);
    }
}

let UserSchema = new Model({
    name: String,
    age: Number
});

let User = mongoose.model('User', UserSchema);


mongoose.connect(`mongodb://localhost:27017/my_test_db`);

let u1 = new User({
    name: "Alex",
    age: 20
});

u1.save();