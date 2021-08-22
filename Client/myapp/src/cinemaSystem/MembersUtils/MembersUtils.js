import ApiDAL from "../DALs/ApiDAL";
const MembersURL = "http://localhost:8000/api/members";

const getMembersAllData = () => {
    return ApiDAL.getAllData(MembersURL)
}
const getMemberById = (id) => {
    return ApiDAL.getById(`http://localhost:8000/api/members/${id}`)
}
const addMember = (obj) => {
    return ApiDAL.addData(MembersURL, obj)
}
const updateMember = (id, obj) => {
    return ApiDAL.updateData(MembersURL, id, obj)
}
const deleteMember = (id) => {
    return ApiDAL.deleteData(MembersURL, id)
}
export default { getMemberById, getMembersAllData, updateMember, deleteMember, addMember }