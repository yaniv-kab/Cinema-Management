import react, { useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import MoviesUtils from '../../MoviesUtils/MoviesUtils'


const EditMovieComp = () => {

    const history = useHistory()
    const [movie, setMovie] = useState(JSON.parse(sessionStorage.getItem("movie")))
    const [name, setName] = useState(movie.name)
    const [genres, setGenres] = useState(movie.genres.toString())
    const [imageUrl, setImageUrl] = useState(movie.image)
    const [premiered, setPremiered] = useState(movie.premiered)
    const updateMovie = async () => {
        let movieToAdd = {
            name: name,
            genres: genres,
            image: imageUrl,
            premiered: premiered
        }
        await MoviesUtils.updateMovie(movie._id, movieToAdd);
        history.push('/main/movies/all')
    }
    let date = new Date(premiered);
    let nowDate = date.toLocaleDateString("fr-CA")
    console.log(premiered);
    return (
        <div>
            <h3>Edit Movie : {movie.name} </h3>
            Name : <input type="text" value={name} onChange={e => { setName(e.target.value) }} /><br />
            Genres :<input type="text" value={genres} onChange={(e) => {
                setGenres(e.target.value.split(","))
                console.log([genres]);
            }} /><br />
            image url : <input type="text" value={imageUrl} onChange={e => { setImageUrl(e.target.value) }} /><br />
            Premiered : <input type="date" value={nowDate} onChange={e => { setPremiered(e.target.value) }} /><br />
            <input type="button" value="Update" onClick={updateMovie} />  <input type="button" value="Cancel" onClick={() => { history.push("/main/movies/all") }} />
        </div>
    )
}

export default EditMovieComp