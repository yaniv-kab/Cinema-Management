import react, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import utils from "../../utils/utils";
const UserCardComp = (props) => {
    let history = useHistory()
    const [user, setUser] = useState(props.user)
    const deleteUser = async () => {
        utils.deleteUser('http://localhost:8001/api/users', user.id)
        utils.deleteUser('http://localhost:8001/api/file/users', user.id)
        utils.deleteUser('http://localhost:8001/api/premissions', user.id)
        props.deleteUserCard(user)
        history.push("/main/users/all")
    }
    const editUser = () => {
        sessionStorage.setItem('firstName', user.firstName)
        sessionStorage.setItem("lastName", user.lastName)
        history.push(`/main/users/editUser/${user.id}`)
    }
    let permissionsToRender
    if (props.user.permissions) {
        permissionsToRender = user.permissions.toString()
    }
    return (
        <div style={{ border: "3px solid black", width: "500px" }}>
            Name : {user.firstName} {user.lastName}<br />
            User Name : {user.userName}<br />
            Session Time Out(Minutes) : {user.sessionTimeOut}  <br />
            Created Date : {user.createdDate}<br />
            Permissions :{permissionsToRender} <br />
            <input type="button" value="Edit" onClick={editUser} /> <input type="button" value="Delete" onClick={deleteUser} />

        </div>
    )
}
export default UserCardComp