import ApiDAL from "../DALs/ApiDAL"
const usersLoginURL = 'http://localhost:8001/api/users'
const usersDataURL = 'http://localhost:8001/api/file/users'
const permissionsURL = 'http://localhost:8001/api/premissions'
const getUserLoginData = () => {
    return ApiDAL.getAllData(usersLoginURL);
}
const getUserLoginDataById = (id) => {
    return ApiDAL.getById(`http://localhost:8001/api/users/${id}`)
}
const updateUserLoginData = (id, obj) => {
    return ApiDAL.updateData(usersLoginURL, id, obj)
}
const addUserLogin = (obj) => {
    return ApiDAL.addData(usersLoginURL, obj)
}
const deleteUser = (url, id) => {
    return ApiDAL.deleteData(url, id)
}
const getPermissionsById = async (id) => {
    let permissionsJson = await ApiDAL.getAllData(permissionsURL);
    let permissions = permissionsJson.data
    let permissionsById = permissions.filter(perm => perm.id == id)
    return permissionsById
}
const getUserNameById = async (id) => {
    let usersLogin = await ApiDAL.getAllData(usersLoginURL);
    let usersLoginData = usersLogin.data
    let userLoginById = usersLoginData.filter(user => user._id == id)
    return userLoginById
}
const getShapedUsers = async () => {
    let usersData = await ApiDAL.getAllData(usersDataURL);
    let usersDBData = await ApiDAL.getAllData(usersLoginURL);
    let perms = await ApiDAL.getAllData(permissionsURL)
    let shapedUsers = usersData.data.map((user, i) => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: usersDBData.data[i].userName,
            createdDate: user.createdDate,
            sessionTimeOut: user.sessionTimeOut,
            permissions: perms.data[i].premissions
        }
    })

    return shapedUsers
}
const updateShapedUsers = async (id, updatedUser) => {
    let shapedUser = await getShapedUserById(id);
    shapedUser = updatedUser;
    return shapedUser



}
const getShapedUserById = async (id) => {
    let userData = await (await ApiDAL.getById(`http://localhost:8001/api/file/users/${id}`)).data[0]
    let shapedUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: '',
        createdDate: userData.createdDate,
        sessionTimeOut: userData.sessionTimeOut,
        permissions: []
    }
    let permissions = await getPermissionsById(id)
    let userName = await getUserNameById(id)
    shapedUser.userName = userName[0].userName;
    shapedUser.permissions = permissions[0].premissions;
    return shapedUser;
}

export default { getUserLoginData, updateUserLoginData, addUserLogin, getShapedUsers, deleteUser, getShapedUserById, getUserLoginDataById, updateShapedUsers }