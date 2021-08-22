const express = require('express');
const subscriptionsBL = require('../models/allBL/subscriptionsBL');

const router = express.Router();

router.route('/').get(async (req,resp)=>{
    let data = await subscriptionsBL.getAllSubscriptions();
    return resp.json(data)
})      
router.route('/:id').get(async (req,resp)=>{
    let id = req.params.id;
    let data = await subscriptionsBL.getSubscriptionById(id);
    return resp.json(data)
})
router.route('/').post(async (req,resp)=>{
    let newSubscription = req.body;
    let data = await subscriptionsBL.addSubscription(newSubscription);
    return resp.json(data);
})
router.route('/:id').put(async (req,resp) => {
    let id = req.params.id;
    let updatedSubscription = req.body;
    let status = await subscriptionsBL.updateSubscription(id,updatedSubscription);
    return resp.json(status)
})
router.route('/:id').delete(async (req,resp)=> {
    let id = req.params.id;
    let status = await subscriptionsBL.deleteSubscription(id);
    return resp.json(status);
})
module.exports = router;