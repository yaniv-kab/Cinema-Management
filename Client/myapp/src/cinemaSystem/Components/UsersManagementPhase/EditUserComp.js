import react, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import premissionsUtils from '../../utils/premissionsUtils';
import usersDataUtils from '../../utils/usersDataUtils';
import utils from '../../utils/utils';


const EditUserComp = (props) => {
    const userId = props.match.params.id
    const history = useHistory()
    const [userLoginData, setUserLoginData] = useState({})
    const [permissions, setPermissions] = useState([])
    const [user, setUser] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstNameUser, setFirstNameUser] = useState(sessionStorage.getItem("firstName"));
    const [lastNameUser, setLastNameUser] = useState(sessionStorage.getItem("lastName"));
    const [userName, setUserName] = useState('');
    const [sessionTimeOut, setSessionTimeOut] = useState(0);

    useEffect(async () => {
        let user = await utils.getShapedUserById(userId);
        let userLoginData = await utils.getUserLoginDataById(userId)
        setUserLoginData(userLoginData.data)
        setUser(user)
        let permissions = user.permissions
        setPermissions(permissions)

    }, [])
    const editPermissions = (e) => {
        if (e.target.checked) {
            let userPermissions = [...permissions];
            userPermissions = [...userPermissions, e.target.name]
            if ((e.target.name == "Create Subscriptions" || e.target.name == "Update Subscriptions" || e.target.name == "Delete Subscriptions") && (userPermissions.includes("View Subscriptions") == false)) {
                userPermissions = [...userPermissions, "View Subscriptions"]
            }
            if ((e.target.name == "Create Movies" || e.target.name == "Update Movies" || e.target.name == "Delete Movies") && (userPermissions.includes("View Movies") == false)) {
                userPermissions = [...userPermissions, "View Movies"]
            }
            setPermissions(userPermissions)
        } else {
            let updatedPermissions = [...permissions];
            let i = updatedPermissions.findIndex(perm => perm === e.target.name)
            updatedPermissions.splice(i, 1)
            if (e.target.name == "View Subscriptions") {
                if (updatedPermissions.includes("Create Subscriptions")) {
                    let createSubsIndex = updatedPermissions.findIndex(perm => perm == "Create Subscriptions")
                    updatedPermissions.splice(createSubsIndex, 1)
                }
                if (updatedPermissions.includes("Update Subscriptions")) {
                    let updateSubsIndex = updatedPermissions.findIndex(perm => perm == "Update Subscriptions");
                    updatedPermissions.splice(updateSubsIndex, 1)
                }
                if (updatedPermissions.includes("Delete Subscriptions")) {
                    let deleteSubsIndex = updatedPermissions.findIndex(perm => perm == "Delete Subscriptions");
                    updatedPermissions.splice(deleteSubsIndex, 1)
                }
            }
            if (e.target.name == "View Movies") {
                if (updatedPermissions.includes("Create Movies")) {
                    let createMoviesIndex = updatedPermissions.findIndex(perm => perm == "Create Movies");
                    updatedPermissions.splice(createMoviesIndex, 1);
                }
                if (updatedPermissions.includes("Update Movies")) {
                    let updateMovIndex = updatedPermissions.findIndex(perm => perm == "Update Movies");
                    updatedPermissions.splice(updateMovIndex, 1);
                }
                if (updatedPermissions.includes("Delete Movies")) {
                    let deleteMovIndex = updatedPermissions.findIndex(perm => perm == "Delete Movies");
                    updatedPermissions.splice(deleteMovIndex, 1)
                }
            }
            setPermissions(updatedPermissions)
        }

    }

    const handleSubmit = async () => {
        let permissionsToUpdate = {
            id: userId,
            premissions: permissions
        }
        await premissionsUtils.updatePermissions(userId, permissionsToUpdate)
        await utils.updateUserLoginData(userId, userLoginData)
        let updatedUser = {
            id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            createdDate: user.createdDate,
            sessionTimeOut: user.sessionTimeOut
        }
        await usersDataUtils.updateUser(userId, updatedUser)
        sessionStorage.removeItem("firstName")
        sessionStorage.removeItem("lastName")
        history.push("/main/users/all")

    }

    return (
        <div >
            <h3>Edit User :{firstNameUser} {lastNameUser}</h3>
            First Name :<input type="text" value={user.firstName} onChange={e => {
                setFirstName(e.target.value)
                user.firstName = e.target.value
            }} /><br />
            Last Name : <input type="text" value={user.lastName} onChange={e => {
                setLastName(e.target.value)
                user.lastName = e.target.value
            }} /><br />
            User Name : <input type="text" value={user.userName} onChange={e => {
                setUserName(e.target.value)
                user.userName = e.target.value
                userLoginData.userName = e.target.value
            }} /><br />
            Session Time Out(Minutes) : <input type="number" value={user.sessionTimeOut} onChange={e => {
                setSessionTimeOut(e.target.value)
                user.sessionTimeOut = e.target.value
            }} /><br />
            Created Date : {user.createdDate} <br />
            Permissions :<br />
            <input type="checkBox" name="View Subscriptions" checked={permissions.includes("View Subscriptions")} onChange={editPermissions} />View Subscriptions <br />
            <input type="checkBox" name="Create Subscriptions" checked={permissions.includes("Create Subscriptions")} onChange={editPermissions} />Create Subscriptions <br />
            <input type="checkBox" name="Update Subscriptions" checked={permissions.includes("Update Subscriptions")} onChange={editPermissions} />Update Subscriptions <br />
            <input type="checkBox" name="Delete Subscriptions" checked={permissions.includes("Delete Subscriptions")} onChange={editPermissions} />Delete Subscriptions <br />
            <input type="checkBox" name="View Movies" checked={permissions.includes("View Movies")} onChange={editPermissions} />View Movies <br />
            <input type="checkBox" name="Create Movies" checked={permissions.includes("Create Movies")} onChange={editPermissions} />Create Movies <br />
            <input type="checkBox" name="Update Movies" checked={permissions.includes("Update Movies")} onChange={editPermissions} />Update Movies<br />
            <input type="checkBox" name="Delete Movies" checked={permissions.includes("Delete Movies")} onChange={editPermissions} />Delete Movies <br /><br />

            <input type="button" value="Update" onClick={handleSubmit} /><input type="button" value="Cancel" onClick={() => { history.push('/main/users/all') }} />
            <br />

        </div>

    )
}

export default EditUserComp