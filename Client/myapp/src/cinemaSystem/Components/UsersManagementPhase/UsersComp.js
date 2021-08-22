import react, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import AllUsersComp from './AllUsersComp'
import AddUserComp from './AddUserComp'
import EditUserComp from './EditUserComp'
const UsersComp = (props) => {
    const history = useHistory()
    let allYellowed;
    let addYellowed
    if (history.location.pathname == "/main/users/all") {
        allYellowed = "#3EDBF0"
        addYellowed = null
    } else if (history.location.pathname == "/main/users/add") {
        allYellowed = null;
        addYellowed = "#3EDBF0"
    }
    return (
        <div style={{ border: "3px solid black", width: "750px" }}>
            <h3>Users</h3>
            <input type="button" style={{ backgroundColor: allYellowed }} value="All Users" onClick={() => { props.history.push('/main/users/all') }} />
            <input type="button" style={{ backgroundColor: addYellowed }} value="Add User" onClick={() => { props.history.push("/main/users/add") }} />
            <Switch>
                <Route path="/main/users/all" component={AllUsersComp} />
                <Route path="/main/users/add" component={AddUserComp} />
                <Route path="/main/users/editUser/:id" component={EditUserComp} />
            </Switch>
        </div>
    )
}
export default UsersComp