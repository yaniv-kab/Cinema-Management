const Mongoose = require('mongoose');

const MemberSchema = new Mongoose.Schema({
    name : String,
    email : String,
    city : String
});


module.exports = Mongoose.model('members',MemberSchema);