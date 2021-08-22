const axios = require('axios')
const getMembers = async () =>{
     return await axios.get('https://jsonplaceholder.typicode.com/users')
}
const getMovies = async () => {
    return await axios.get('https://api.tvmaze.com/shows')
}
module.exports = {getMembers,getMovies}