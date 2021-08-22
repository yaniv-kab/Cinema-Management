import ApiDAL from "../DALs/ApiDAL";
const usersDataURL = 'http://localhost:8001/api/file/users'
const getUsersData = () => {
    return ApiDAL.getAllData(usersDataURL);
}
const addUser = (obj) => {
    return ApiDAL.addData(usersDataURL, obj)
}
const getUserById = (id) => {
    return ApiDAL.getById(`http://localhost:8001/api/file/users/${id}`)
}
const updateUser = (id, obj) => {
    return ApiDAL.updateData(usersDataURL, id, obj)
}

export default { getUsersData, addUser, getUserById, updateUser }