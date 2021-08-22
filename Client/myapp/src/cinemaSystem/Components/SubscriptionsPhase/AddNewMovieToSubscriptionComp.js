import react, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import MoviesUtils from '../../MoviesUtils/MoviesUtils'
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils'


const AddMovieToSubscriptionComp = (props) => {

    const history = useHistory()
    const [dateWatched, setDateWatched] = useState('')
    const [movieSelected, setMovieSelected] = useState('Select Movie')
    const [moviesNotWatched, setMoviesNotWatched] = useState([])
    useEffect(async () => {
        const allMovies = await MoviesUtils.getMoviesAllData()
        let moviesData = allMovies.data
        let moviesNotWatchedData = []
        moviesData.forEach(movie => {
            let filteredWatchedMovies = props.moviesWatched.filter(mov => movie._id.includes(mov.id))
            if (filteredWatchedMovies.length == 0) {
                moviesNotWatchedData = [...moviesNotWatchedData, movie]
            }
        })


        setMoviesNotWatched(moviesNotWatchedData)

    }, [])

    const subscribeMovieToMember = async () => {
        if (movieSelected != "Select Movie") {
            let movieToAdd = moviesNotWatched.filter(mov => mov.name == movieSelected)
            let movieId = movieToAdd[0]._id;
            let updatedMoviesWatched = [...props.moviesWatched, { id: movieId, movieName: movieToAdd[0].name, date: dateWatched }]
            let subById = props.subscriptions.filter(sub => sub.memberId == props.member._id)
            subById[0].movies = [...subById[0].movies, { movieId: movieId, watchedDate: dateWatched }]
            let subToUpdate = {
                memberId: props.member._id,
                movies: subById[0].movies
            }
            await SubscriptionsUtils.updateSubscription(subById[0]._id, subToUpdate)
            let movieSelectedIndex = moviesNotWatched.findIndex(mov => mov.name == movieSelected)
            moviesNotWatched.splice(movieSelectedIndex, 1)
            setMoviesNotWatched(moviesNotWatched)
            props.updateMoviesWathced(updatedMoviesWatched)
            setMovieSelected("Select Movie")
            history.push("/main/subscriptions/all")
        }

    }
    let movieOptions = moviesNotWatched.map(mov => {
        return <option key={mov.id}>{mov.name}</option>
    })
    return (
        <div style={{ border: "4px solid #3EDBF0", width: "300px" }}>
            Add A New Movie <br />
            <select onChange={e => { setMovieSelected(e.target.value) }} value={movieSelected}>
                <option>Select Movie</option>
                {movieOptions}

            </select>
            <input type="date" onChange={e => setDateWatched(e.target.value)} /><br />
            <input type="button" value="Subscribe" onClick={subscribeMovieToMember} />

        </div>
    )
}
export default AddMovieToSubscriptionComp