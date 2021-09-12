import ApiDAL from "../DALs/ApiDAL";
const PermissionsURL = 'https://mern-cinema-cinemawebserver.herokuapp.com/api/premissions'
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
