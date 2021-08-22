import axios from "axios";

const getAllData = (url) => {
    return axios.get(url)
}
const getById = (url) => {
    return axios.get(url)
}
const updateData = (url, id, obj) => {
    return axios.put(`${url}/${id}`, obj)
}
const addData = (url, obj) => {
    return axios.post(url, obj)
}
const deleteData = (url, id) => {
    return axios.delete(`${url}/${id}`)
}

export default { getAllData, updateData, addData, deleteData, getById }