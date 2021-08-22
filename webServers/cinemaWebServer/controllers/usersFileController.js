const express = require('express')

const router = express.Router()

const usersFileDAL = require('../DALs/usersFileDAL')


//get users

router.route('/').get(async (req, resp) => {
    let users = await usersFileDAL.readUsers();
    return resp.json(users);
})
router.route('/:id').get(async (req, resp) => {
    let id = req.params.id;
    let data = await usersFileDAL.readUserById(id);
    return resp.json(data);
})
router.route('/').post(async (req, resp) => {
    let newUser = req.body;
    let data = await usersFileDAL.addUserFile(newUser);
    return resp.json(data)
})
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let status = await usersFileDAL.updateUserFile(id, updatedUser);
    return resp.json(status)
})
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let status = await usersFileDAL.deleteUserFile(id);
    return resp.json(status)
})

module.exports = router