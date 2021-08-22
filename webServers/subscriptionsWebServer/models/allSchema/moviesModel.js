const Mongoose = require('mongoose');


const MovieSchema = new Mongoose.Schema({
    name : String,
    genres:[String] ,
    image:String,
    premiered : Date
});


module.exports = Mongoose.model('movies',MovieSchema);