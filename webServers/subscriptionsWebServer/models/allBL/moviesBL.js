const Movie = require('../allSchema/moviesModel')
const utils = require('./Utils')

const shapedMovies = async () => {
    const movies = await utils.getMovies()
    movies.data.map(movie => {
        let shapedMovie = new Movie({
            name : movie.name,
            genres : movie.genres,
            image : movie.image.medium,
            premiered : movie.premiered
        })
        shapedMovie.save(err=>{
            if(err){
                console.log(err);
            }
        })
    })

}
const  getAllMovies = () => {
    return new Promise( (resolve,reject) => {
        Movie.find({},(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}
const getMovieById = (movieId) => {
    return new Promise( (resolve,reject) => {
        Movie.findById(movieId,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
const addMovie = (newMovie) => {
    return new Promise( (resolve,reject) => {
        let movieToSave = new Movie({
            name : newMovie.name,
            genres : newMovie.genres,
            image : newMovie.image,
            premiered : newMovie.premiered
        });
        movieToSave.save(err=>{
            if(err){
                reject(err)
            }else{
                resolve(movieToSave)
            }
        })
    })
}
const updateMovie = (movieId,movieToUpdate) => {
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndUpdate(movieId,{
            name : movieToUpdate.name,
            genres : movieToUpdate.genres,
            image : movieToUpdate.image,
            premiered : movieToUpdate.premiered
        },err => {
            if(err){
                reject(err)
            }else { 
                resolve("Movie Updated")
            }
        })
    })
}
const deleteMovie = (movieId)=>{
    return new Promise( (resolve,reject) => {
        Movie.findByIdAndDelete(movieId , err => {
            if(err){
                reject(err)
            }else{
                resolve("Movie Deleted")
            }
        })
    })
}
module.exports = {shapedMovies,getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie}