import react, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MembersUtils from '../../MembersUtils/MembersUtils';
import MoviesUtils from '../../MoviesUtils/MoviesUtils';
import { useHistory } from 'react-router-dom';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';


const UserCardComp = (props) => {

    const history = useHistory()
    const [movie, setMovie] = useState({});
    const [subscriptions, setSubscriptions] = useState([])
    const [permissions, setPermissions] = useState(JSON.parse(sessionStorage.getItem("permissions")).premissions)
    const [membersWatchedMovies, setMembersWatchedMovies] = useState([])
    let membersWatched = []
    useEffect(async () => {
        const subscriptionsFromDB = await SubscriptionsUtils.getAllSubscriptions()
        setSubscriptions(subscriptionsFromDB.data)
        if (props.movie != undefined) {
            setMovie(props.movie)
            subscriptionsFromDB.data.forEach(sub => {
                if (sub.movies.length > 0) {
                    sub.movies.forEach(async (movieData) => {
                        console.log(props.movie);
                        console.log(movieData);
                        if (movieData.movieId === props.movie._id) {
                            console.log("hi");
                            let memberById = await MembersUtils.getMemberById(sub.memberId)
                            membersWatched = [...membersWatched, { id: sub.memberId, date: movieData.watchedDate, name: memberById.data.name }]
                            setMembersWatchedMovies(membersWatched)

                        }

                    })
                }
            })
        } else if (props.match.params.id) {
            const movieById = await MoviesUtils.getMovieById(props.match.params.id)
            setMovie(movieById.data)
            subscriptionsFromDB.data.forEach(sub => {
                if (sub.movies.length > 0) {
                    sub.movies.forEach(async (movieData) => {
                        console.log(props.movie);
                        console.log(movieData);
                        if (movieData.movieId === movieById.data._id) {
                            console.log("hi");
                            let memberById = await MembersUtils.getMemberById(sub.memberId)
                            membersWatched = [...membersWatched, { id: sub.memberId, date: movieData.watchedDate, name: memberById.data.name }]
                            setMembersWatchedMovies(membersWatched)

                        }

                    })
                }
            })
        }
    }, [])


    let editButton;
    let deleteButton;
    let date = new Date(movie.premiered)
    if (permissions.includes("Update Movies")) {
        editButton = <input type="button" value="Edit" onClick={() => {
            sessionStorage.setItem("movie", JSON.stringify(movie))
            history.push('/main/movies/edit')
        }} />
    }
    if (permissions.includes("Delete Movies")) {
        deleteButton = <input type="button" value="Delete" onClick={async () => {
            await MoviesUtils.deleteMovie(movie._id);
            if (props.movie != undefined) {
                props.deleteMovieCard(movie)
            }
            history.push("/main/movies/all")
        }} />
    }
    let genresToRender;
    if (JSON.stringify(movie) != "{}") {
        genresToRender = movie.genres.toString()

    }
    let membersWathcedToRender;
    if (membersWatchedMovies.length > 0) {
        membersWathcedToRender = membersWatchedMovies.map(member => {
            let date = new Date(member.date)
            return <li key={member.id}><Link style={{ color: "unset", textDecorationColor: "#3EDBF0", textDecorationThickness: "3px" }} to={`/main/subscriptions/all/${member.id}`} > {member.name}</Link> , {date.toLocaleDateString("en-TT")}</li>
        })
    }
    return (
        <div style={{ border: "3px solid black", width: "500px" }}>
            <b>{movie.name} , {date.getFullYear()}</b><br />
            genres : {genresToRender}
            <div style={{ width: "100px" }}>
                <img src={movie.image} width="70px" />
            </div>
            <div style={{ border: "3px solid black", position: "relative", width: "300px", bottom: "82px", left: "90px" }}  >
                Subscriptions Watched
                <ul>
                    {membersWathcedToRender}
                </ul>


            </div>

            {editButton}{deleteButton}

        </div >
    )
}
export default UserCardComp