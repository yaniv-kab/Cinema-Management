import React from 'react'
import { useEffect, useState } from 'react'
import utils from '../../utils/utils'


const CreateAccountComp = (props) => {

    const [userName, setUserName] = useState(sessionStorage.getItem('userName'));
    const [password, setPassword] = useState('');

    const setAcc = async () => {
        let users = await utils.getUserLoginData();
        let usersData = users.data;
        console.log(usersData);
        let userData = usersData.filter(user => user.userName == userName)
        console.log(userData[0]);
        let id = userData[0]._id;
        let userToUpdate = {
            userName: userName,
            password: password
        }
        await utils.updateUserLoginData(id, userToUpdate);
        alert("User Created")
        console.log(users.data);
        props.history.push('/')
    }

    return (
        <div>
            <h2>Create An Account</h2>
            User name : <input type="text" value={userName} onChange={e => setUserName(e.target.value)} /><br />
            Password : <input type="text" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} /><br />
            <input type="button" value="Create" onClick={setAcc} />

        </div>
    )
}

export default CreateAccountComp