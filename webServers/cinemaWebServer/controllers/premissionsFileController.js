const express = require('express');
const router = express.Router();
const premissionsFileDAL = require('../DALs/premissionsFileDAL');


router.route('/').get(async (req,resp)=>{
    let premissions = await premissionsFileDAL.readPremissions();
    return resp.json(premissions)
})
router.route('/:id').get(async (req,resp)=>{
    let id = req.params.id;
    let data = await premissionsFileDAL.readPremissionById(id);
    return resp.json(data)
})
router.route('/').post(async(req,resp)=>{
    let newPremission = req.body;
    let data = await premissionsFileDAL.addPremissionFile(newPremission);
    return resp.json(data)
})
router.route('/:id').put(async (req,resp)=>{
    let id = req.params.id;
    let updatedPremission = req.body;
    let status = await premissionsFileDAL.updatePremissionFile(id,updatedPremission);
    return resp.json(status)
})
router.route('/:id').delete( async (req,resp)=>{
    let id = req.params.id;
    let status = await premissionsFileDAL.deletePremissionFile(id);
    return resp.json(status)
})
module.exports = router