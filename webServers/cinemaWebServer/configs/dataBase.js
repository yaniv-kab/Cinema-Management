const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/usersDB', {
    useNewUrlParser : true ,
    useUnifiedTopology: true
});