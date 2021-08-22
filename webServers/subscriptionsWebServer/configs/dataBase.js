const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/subscriptionDB', {
    useNewUrlParser : true ,
    useUnifiedTopology: true
});


