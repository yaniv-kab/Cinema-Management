const Subscription = require('../allSchema/subscriptionsModel');

const getAllSubscriptions = () => {
    return new Promise( (resolve,reject) => {
        Subscription.find({},(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}
const getSubscriptionById = (subscriptionId) => {
    return new Promise( (resolve,reject) => {
        Subscription.findById(subscriptionId,(err,data)=> {
            if(err){
                reject(err) 
            }else {
                resolve(data)
            }
        })
     })
}
const addSubscription = (newSubscription) => {
    return new Promise( (resolve,reject) => {
        let subscriptionToSave = new Subscription({
            memberId : newSubscription.memberId,
            movies : newSubscription.movies
        }); 
        subscriptionToSave.save(err => {
            if(err){
                reject(err)
            }else{
                resolve(subscriptionToSave)
            }
        })
    })
}
const updateSubscription = (subscriptionId,subscriptionToUpdate) => {
    return new Promise( (resolve,reject) => { 
        Subscription.findByIdAndUpdate( subscriptionId , {
            memberId : subscriptionToUpdate.memberId,
            movies : subscriptionToUpdate.movies
        }, err => {
            if(err){
                reject(err)
            }else{
                resolve("Subscriber Updated")
            }
        })
    })

}
const deleteSubscription = (subscriptionId) => {
    return new Promise( (resolve,reject) => {
        Subscription.findByIdAndDelete(subscriptionId, err => {
            if(err){
                reject()
            }else{
                resolve("Subscriber Deleted")
            }
        })
     })
}
module.exports = {getAllSubscriptions,getSubscriptionById,addSubscription,updateSubscription,deleteSubscription}