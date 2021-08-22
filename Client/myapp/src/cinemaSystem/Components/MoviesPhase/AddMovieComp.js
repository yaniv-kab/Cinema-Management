import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import MoviesUtils from "../../MoviesUtils/MoviesUtils";

const AddMovieComp = () => {
    const history = useHistory()
    const [name, setName] = useState('');
    const [genres, setGenres] = useState([])
    const [imageUrl, setImageUrl] = useState('')
    const [premiered, setPremiered] = useState('')

    const addMovie = async () => {
        const movieToAdd = {
            name: name,
            genres: genres,
            image: imageUrl,
            premiered: premiered
        }
        await MoviesUtils.addNewMovie(movieToAdd);
        history.push("/main/movies/all")
    }
    return (
        <div>
            <h3>Add Movie : </h3>
            Name : <input type="text" value={name} onChange={e => { setName(e.target.value) }} /><br />
            Genres :<input type="text" value={genres} onChange={(e) => {
                setGenres(e.target.value.split(","))
                console.log([genres]);
            }} /><br />
            image url : <input type="text" value={imageUrl} onChange={e => { setImageUrl(e.target.value) }} /><br />
            Premiered : <input type="date" value={premiered} onChange={e => { setPremiered(e.target.value) }} /><br />
            <input type="button" value="Save" onClick={addMovie} />  <input type="button" value="Cancel" onClick={() => { history.push("/main/movies/all") }} />
        </div>
    )
}
export default AddMovieComp