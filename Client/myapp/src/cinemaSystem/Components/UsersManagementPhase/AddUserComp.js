import react, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import premissionsUtils from '../../utils/premissionsUtils'
import usersDataUtils from '../../utils/usersDataUtils'
import utils from '../../utils/utils'


const AddUserComp = () => {
    const history = useHistory()
    const [permissions, setPermissions] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [sessionTimeOut, setSessionTimeOut] = useState(0)

    useEffect(async () => {
        let allUsersLoginData = await (await utils.getUserLoginData()).data
    }, [])


    const saveUser = async (e) => {
        e.preventDefault()
        let userLoginToAdd = {
            userName: userName,
            password: ''
        }
        let newUser = await utils.addUserLogin(userLoginToAdd);
        const userDataId = newUser.data._id
        console.log(userDataId);
        let date = new Date();
        let createdDate = date.toLocaleDateString("en-TT")
        let userDataToAdd = {
            id: userDataId,
            firstName: firstName,
            lastName: lastName,
            createdDate: createdDate,
            sessionTimeOut: sessionTimeOut
        }
        await usersDataUtils.addUser(userDataToAdd);
        let permissionsToAdd = {
            id: userDataId,
            premissions: permissions
        }
        await premissionsUtils.addPermissions(permissionsToAdd)
        history.push('/main/users/all')
    }




    const addPermissions = (e) => {
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

    return (
        <div>
            <form onSubmit={saveUser}>
                <h3>Add New User </h3>
                First Name :<input type="text" onChange={e => { setFirstName(e.target.value) }} /> <br />
                Last Name : <input type="text" onChange={e => { setLastName(e.target.value) }} /> <br />
                User Name : <input type="text" onChange={e => { setUserName(e.target.value) }} /> <br />
                Session Time Out(Minutes) : <input type="number" onChange={e => { setSessionTimeOut(e.target.value) }} /> <br />
                Permissions : <br />
                <input type="checkBox" name="View Subscriptions" checked={permissions.includes("View Subscriptions")} onChange={addPermissions} />View Subscriptions <br />
                <input type="checkBox" name="Create Subscriptions" checked={permissions.includes("Create Subscriptions")} onChange={addPermissions} />Create Subscriptions <br />
                <input type="checkBox" name="Update Subscriptions" checked={permissions.includes("Update Subscriptions")} onChange={addPermissions} />Update Subscriptions <br />
                <input type="checkBox" name="Delete Subscriptions" checked={permissions.includes("Delete Subscriptions")} onChange={addPermissions} />Delete Subscriptions <br />
                <input type="checkBox" name="View Movies" checked={permissions.includes("View Movies")} onChange={addPermissions} />View Movies <br />
                <input type="checkBox" name="Create Movies" checked={permissions.includes("Create Movies")} onChange={addPermissions} />Create Movies <br />
                <input type="checkBox" name="Update Movies" checked={permissions.includes("Update Movies")} onChange={addPermissions} />Update Movies<br />
                <input type="checkBox" name="Delete Movies" checked={permissions.includes("Delete Movies")} onChange={addPermissions} />Delete Movies <br /><br />
                <input type="submit" value="Save" />
                <input type="button" value="Cancel" onClick={() => { history.push('/main/users/all') }} />
            </form>


        </div>
    )
}

export default AddUserComp