const express = require('express');
const membersBL = require('../models/allBL/membersBL');

const router = express.Router();

router.route('/').get(async (req,resp)=>{
    let data = await membersBL.getAllMembers();
    return resp.json(data)
})
router.route('/:id').get(async (req,resp)=>{
    let id = req.params.id;
    let data = await membersBL.getMemberById(id);
    return resp.json(data)
})
router.route('/').post(async (req,resp) => {
    let newMember = req.body;
    let data = await membersBL.addMember(newMember);
    return resp.json(data)
})
router.route('/:id').put( async (req,resp) => {
    let id = req.params.id;
    let updatedMember = req.body;
    let status = await membersBL.updateMember(id,updatedMember);
    return resp.json(status)
})
router.route('/:id').delete(async (req,resp) => {
    let id = req.params.id;
    let status = await membersBL.deleteMember(id);
    return resp.json(status);
})
module.exports = router;