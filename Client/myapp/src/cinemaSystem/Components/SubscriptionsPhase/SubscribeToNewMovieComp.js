import react, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MoviesUtils from '../../MoviesUtils/MoviesUtils';
import { SubscriptionsContext } from './SubscriptionsContext';
import AddMovieToSubscriptionComp from './AddNewMovieToSubscriptionComp';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';

const SubscribeToNewMovieComp = (props) => {

    const [allMovies, setAllMovies] = useState([])
    const [allSubscriptions, setAllSubscriptions] = useState([])
    const [moviesMemberWatched, setMoviesMemberWatched] = useState([])
    const [subscribeToMovieClicked, setSubscribeToMovieClicked] = useState(false)
    useEffect(async () => {
        const allSubscriptions = await (await SubscriptionsUtils.getAllSubscriptions()).data
        setAllSubscriptions(allSubscriptions)
        let allMoviesData = await MoviesUtils.getMoviesAllData();
        setAllMovies(allMoviesData.data)
        let filteredSubs = allSubscriptions.filter(sub => sub.memberId == props.member._id)
        if (filteredSubs.length > 0) {
            let newMovies = [];
            filteredSubs[0].movies.forEach(movie => {
                newMovies = [...newMovies, { movieId: movie.movieId, watchedDate: movie.watchedDate }]
            });
            let moviesWatched = []
            newMovies.forEach(movie => {
                let index = allMoviesData.data.findIndex(movieData => movieData._id == movie.movieId)
                if (index !== -1) {
                    moviesWatched = [...moviesWatched, {
                        id: movie.movieId,
                        movieName: allMoviesData.data[index].name,
                        date: movie.watchedDate
                    }]
                }
            })
            setMoviesMemberWatched(moviesWatched)
        }
    }, [])

    const subscribeWindow = () => {

        setSubscribeToMovieClicked(!subscribeToMovieClicked)
    }
    let addMovieToSubscription;
    let watchedMoviesListToRender;

    if (subscribeToMovieClicked) {
        addMovieToSubscription = <AddMovieToSubscriptionComp key={props.member._id} updateMoviesWathced={(data) => { setMoviesMemberWatched(data) }} moviesWatched={moviesMemberWatched} subscriptions={allSubscriptions} member={props.member} />
    } else {
        addMovieToSubscription = null
    }


    if (moviesMemberWatched) {
        watchedMoviesListToRender = moviesMemberWatched.map((movie, i) => {
            let watchedDate = new Date(movie.date)
            return <li key={i}><Link style={{ color: "unset", textDecorationColor: "#3EDBF0", textDecorationThickness: "3px" }} to={`/main/movies/all/${movie.id}`}>{movie.movieName}</Link> , {watchedDate.toLocaleDateString("en-TT")}</li>
        })
    }

    return (
        <div style={{ border: "3px solid black", width: "400px" }}>
            <b>Movies Watched</b><br />
            <input type="button" value="Subscribe to new movie" onClick={subscribeWindow} />
            {addMovieToSubscription}
            <ul>
                {watchedMoviesListToRender}
            </ul>
        </div>
    )
}
export default SubscribeToNewMovieComp