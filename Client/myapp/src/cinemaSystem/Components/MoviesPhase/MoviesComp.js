import react, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom';
import AddMovieComp from './AddMovieComp';
import AllMoviesComp from './AllMoviesComp';
import EditMovieComp from './EditMovieComp';
import { MoviesContextProvider } from './MoviesContext';
import MovieCardComp from './MovieCardComp'


const MoviesComp = () => {
    const [permissions, setPermissions] = useState(JSON.parse(sessionStorage.getItem("permissions")).premissions)
    const history = useHistory()
    console.log(history);
    let allYellowed;
    let addYellowed
    if (history.location.pathname == "/main/movies/all") {
        allYellowed = "#3EDBF0"
        addYellowed = null
    } else if (history.location.pathname == "/main/movies/add") {
        allYellowed = null;
        addYellowed = "#3EDBF0"
    }
    return (
        <div style={{ border: "3px solid black", width: "750px" }}>
            <h3>Movies</h3>
            <input type="button" style={{ backgroundColor: allYellowed }} value="All Movies" onClick={() => {
                if (permissions.includes("View Movies")) { history.push('/main/movies/all') } else {
                    alert("You Dont Have The Right Permission")
                }
            }} />
            <input type="button" style={{ backgroundColor: addYellowed }} value="Add Movie" onClick={() => {
                if (permissions.includes("Create Movies")) { history.push('/main/movies/add') } else {
                    alert("You Dont Have The Right Permission")
                }
            }} />
            <Switch>
                <MoviesContextProvider>
                    <Route path="/main/movies/all/:id" component={MovieCardComp} />
                    <Route exact path="/main/movies/all" component={AllMoviesComp} />
                    <Route path="/main/movies/add" component={AddMovieComp} />
                    <Route path="/main/movies/edit" component={EditMovieComp} />
                </MoviesContextProvider>
            </Switch>

        </div>
    )
}
export default MoviesComp