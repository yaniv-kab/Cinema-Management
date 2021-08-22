const express = require('express');
const usersBL = require('../models/allBL/usersBL');

const router = express.Router();

router.route('/').get(async (req, resp) => {
    let users = await usersBL.getAllUsers();
    return resp.json(users)
})
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await usersBL.getUserById(id);
    return resp.json(data)
})
router.route('/').post(async (req, resp) => {
    let newUser = req.body;
    let data = await usersBL.addUser(newUser);
    return resp.json(data)
})
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let status = await usersBL.updateUser(id, updatedUser);
    return resp.json(status)
})
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let status = await usersBL.deleteUser(id);
    return resp.json(status)
})
module.exports = router;