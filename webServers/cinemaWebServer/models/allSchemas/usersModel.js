const Mongoose = require('mongoose');


const UserSchema = new Mongoose.Schema({
    userName : String , 
    password : String 
});


module.exports = Mongoose.model('users',UserSchema);