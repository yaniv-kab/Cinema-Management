const Member =require('../allSchema/membersModel');
const utils = require('./Utils');

const shapedMembers = async () => {
    let members = await utils.getMembers()
    members.data.map(member => {
        let shapedMember = new Member({
            name : member.name,
            email : member.email,
            city : member.address.city
        })
        shapedMember.save(err => {
            if(err){
                console.log(err);
            }
        })
    })
}
const getAllMembers = () => {
    return new Promise((resolve,reject)=>{
        Member.find({},(err,data)=>{
            if(err){
                reject(err);
            }else {
                resolve(data);
            }
        })
    })

}

const getMemberById = (memberId)=>{
    return new Promise((resolve,reject)=>{
        Member.findById(memberId,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}
const addMember = (newMember) => {
    return new Promise((resolve,reject)=>{
        let memberToSave = new Member({
            name : newMember.name,
            email : newMember.email,
            city : newMember.city
        });
        memberToSave.save(err=>{
            if(err){
                reject(err)
            }else {
                resolve(memberToSave)
            }
        })
    })

}
const updateMember = (memberId,memberToUpdate) => {
    return new Promise( (resolve,reject) => {
        Member.findByIdAndUpdate( memberId , {
            name: memberToUpdate.name,
            email : memberToUpdate.email,
            city : memberToUpdate.city
        } , err => {
            if(err){
                reject(err)
            }else {
                resolve("Member Updated")
            }
        })
     })

}
const deleteMember = (memberId) => {
    return new Promise( (resolve,reject) => {
        Member.findByIdAndDelete(memberId , err => {
            if(err){
                reject(err)
            }else{
                resolve("Member Deleted")
            }
        })
    })
}



module.exports = {getAllMembers,getMemberById,shapedMembers,addMember,updateMember,deleteMember}