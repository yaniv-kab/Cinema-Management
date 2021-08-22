import ApiDAL from "../DALs/ApiDAL";
const PermissionsURL = 'http://localhost:8001/api/premissions'
const getAllPremissions = () => {
    return ApiDAL.getAllData(PermissionsURL)
}
const updatePermissions = (id, obj) => {
    return ApiDAL.updateData(PermissionsURL, id, obj)
}
const addPermissions = (obj) => {
    return ApiDAL.addData(PermissionsURL, obj)
}
export default { getAllPremissions, updatePermissions, addPermissions }
