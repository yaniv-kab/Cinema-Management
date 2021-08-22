const User = require('../allSchemas/usersModel');

const getAllUsers = () => {
    return new Promise( (resolve,reject) => {
        User.find({},(err,data)=>{
            if(err){
                reject(err);
            }else {
                resolve(data);
            }
        })
    })
}
const getUserById = (userId) => {
    return new Promise( (resolve,reject) => {
        User.findById(userId,(err,data)=> {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    } )
}
const addUser = (newUser) => {
    return new Promise( (resolve,reject) => {
        let userToSave = new User({
            userName : newUser.userName,
            password : newUser.password
    });
    userToSave.save(err=>{
        if(err){
            reject(err)
        }else{
            resolve(userToSave)
        }
    })
    })
}
const updateUser = (userId,userToUpdate) => {
    return new Promise( (resolve,reject)=>{
        User.findByIdAndUpdate(userId,{
            userName : userToUpdate.userName,
            password : userToUpdate.password
        }, err => {
            if(err){
                reject(err)
            }else{
                resolve("User Updated")
            }
        })
    } )
}
const deleteUser = (userId) => {
    return new Promise( (resolve,reject)=>{
        User.findByIdAndDelete(userId,err=>{
            if(err){
                reject(err)
            }else{
                resolve("User Deleted")
            }
        })
    })
}
module.exports = {getAllUsers,getUserById,addUser,updateUser,deleteUser} 