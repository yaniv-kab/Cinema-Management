const Mongoose = require('mongoose');


const SubscriptionSchema = new Mongoose.Schema({
    memberId : Mongoose.ObjectId,
    movies : [{movieId:Mongoose.ObjectId,watchedDate:Date}],
})


module.exports = Mongoose.model('subscriptions',SubscriptionSchema)