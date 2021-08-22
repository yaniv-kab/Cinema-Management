import react, { useContext, useEffect, useState } from 'react';
import { MoviesContext } from './MoviesContext';
import MoviesUtils from '../../MoviesUtils/MoviesUtils';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';
import MovieCard from './MovieCardComp'
import SearchComp from './SearchComp';



const AllMoviesComp = () => {
    const [moviesData, setMoviesData] = useContext(MoviesContext)
    const [searchMovies, setSearchMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [permissions, setPermissions] = useState(JSON.parse(sessionStorage.getItem("permissions")).premissions)
    console.log(permissions);
    console.log(searchMovies);
    useEffect(async () => {
        let allSubscriptionsData = await SubscriptionsUtils.getAllSubscriptions();
        console.log(allSubscriptionsData.data);
        setSubscriptions(allSubscriptionsData.data)

    }, [])
    useEffect(async () => {
        let allMoviesData = await MoviesUtils.getMoviesAllData()
        console.log(allMoviesData.data);
        let tenMovies = allMoviesData.data
        setMovies(tenMovies)
        setSearchMovies(tenMovies)

    }, [])
    let movieCardToRender
    if (searchMovies.length > 0) {
        movieCardToRender = searchMovies.map(movie => {
            return <MovieCard key={movie._id} movie={movie} permissions={permissions}
                deleteMovieCard={(data) => {
                    let allMovies = movies;
                    let i = allMovies.findIndex(movie => movie._id == data._id);
                    allMovies.splice(i, 1);
                    setMovies(allMovies)
                }} />
        })
    }
    return (
        <div>
            <SearchComp movies={movies} updateMovies={(data) => { setSearchMovies(data) }} />
            <h3>All Movies</h3>
            {movieCardToRender}



        </div>
    )
}
export default AllMoviesComp