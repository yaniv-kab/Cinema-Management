import { Switch, Route, Link, useHistory } from 'react-router-dom'
import react, { useEffect, useState } from 'react'
import usersDataUtils from '../../utils/usersDataUtils'
import premissionsUtils from '../../utils/premissionsUtils'
import UsersComp from '../UsersManagementPhase/UsersComp'
import MoviesComp from '../MoviesPhase/MoviesComp'
import SubscriptionsComp from '../SubscriptionsPhase/SubscriptionsRouteComp'
import EditUserComp from '../UsersManagementPhase/EditUserComp'
const MainComp = (props) => {

    const history = useHistory()
    const [session, setSession] = useState('')
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"))
    const [userName, setUserName] = useState(sessionStorage.getItem('userName'))
    const [usersData, setUsersData] = useState([])
    const [premissions, setPremissions] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [moviesClicked, setMoviesClicked] = useState(false)
    const [subscriptionsClicked, setSubscriptionsClicked] = useState(false);
    const [usersManClicked, setUsersManClicked] = useState(false)
    useEffect(async () => {
        let users = await usersDataUtils.getUsersData();
        setUsersData(users.data)
        let permissions = await premissionsUtils.getAllPremissions();
        setPremissions(permissions.data)

        if (userName == "Admin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        let sessionTime = sessionStorage.getItem('sessionTimeOut')
        let logOutTimer = setTimeout(() => {
            sessionStorage.removeItem("userName")
            sessionStorage.removeItem("permissions")
            sessionStorage.removeItem("userId")
            sessionStorage.removeItem("movie")
            sessionStorage.removeItem("movieName")
            sessionStorage.removeItem("member")
            sessionStorage.removeItem('sessionTimeOut')
            props.history.push('/')
            alert("Your Time In The System Expired")
        }, sessionTime * 60000);
        setSession(logOutTimer)
    }, [])
    const allMovies = () => {
        let index = premissions.findIndex(prem => prem.id == userId)
        if (premissions[index].premissions.includes("View Movies")) {
            props.history.push(`/main/movies/all`)
            setMoviesClicked(true)
            setUsersManClicked(false)
            setSubscriptionsClicked(false)
        } else {
            alert("You Dont Have The Right Permission To See Movies")
        }
    }
    let movYellowed;
    let SubsYellowed;
    let usersManYellowed;
    if (moviesClicked || history.location.pathname == "/main/movies/all" || history.location.pathname == "/main/movies/add" || history.location.pathname == "/main/movies/edit") {
        movYellowed = "#3EDBF0";
        SubsYellowed = null;
        usersManYellowed = null
    } else if (subscriptionsClicked || history.location.pathname == "/main/subscriptions/all" || history.location.pathname == "/main/subscriptions/add" || history.location.pathname == "/main/subscriptions/edit") {
        movYellowed = null;
        SubsYellowed = "#3EDBF0";
        usersManYellowed = null
    } else if (usersManClicked) {
        movYellowed = null;
        SubsYellowed = null;
        usersManYellowed = "#3EDBF0"
    }
    let usersManagementButton;
    if (isAdmin) {
        usersManagementButton = <input style={{ backgroundColor: usersManYellowed }} type="button" value="Users Management" onClick={() => {
            props.history.push('/main/users/all')
            setMoviesClicked(false)
            setUsersManClicked(true)
            setSubscriptionsClicked(false)
        }} />
    } else {
        usersManagementButton = null
    }
    let permissionsById = premissions.filter(prem => prem.id == userId)
    sessionStorage.setItem("permissions", JSON.stringify(permissionsById[0]))
    return (
        <div>
            <h4>Hello {userName} </h4>
            <input style={{ backgroundColor: movYellowed }} type="button" value="Movies" onClick={allMovies} />
            <input style={{ backgroundColor: SubsYellowed }} type="button" value="Subscriptions" onClick={() => {
                props.history.push(`/main/subscriptions/all`)
                setMoviesClicked(false)
                setUsersManClicked(false)
                setSubscriptionsClicked(true)
            }} />
            {usersManagementButton}
            <input type="button" value="Log Out" onClick={() => {
                props.history.push('/'); sessionStorage.removeItem("userName")
                sessionStorage.removeItem("permissions")
                sessionStorage.removeItem("userId")
                sessionStorage.removeItem("member")
                sessionStorage.removeItem("movieName")
                sessionStorage.removeItem("movie")
                sessionStorage.removeItem("sessionTimeOut")
                clearTimeout(session)
            }} /> <br />
            <Switch>
                <Route path="/main/users/" component={UsersComp} />
                <Route path="/main/movies/" component={MoviesComp} />
                <Route path="/main/subscriptions" component={SubscriptionsComp} />
            </Switch>

        </div>
    )
}
export default MainComp