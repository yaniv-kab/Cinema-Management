import react, { useEffect, useState } from 'react'
import utils from '../../utils/utils';
import { Link } from 'react-router-dom';
import usersDataUtils from '../../utils/usersDataUtils';

const LoginComp = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [isExist, setIsExist] = useState(false);
    useEffect(async () => {
        let usersLoginData = await utils.getUserLoginData();
        setUsers(usersLoginData.data);
        console.log(usersLoginData.data);
    }, [])
    const createAcc = () => {
        let existUsers = users.filter(user => user.userName == userName);
        console.log(existUsers);
        if (existUsers[0] != null) {
            sessionStorage.setItem('userName', userName)
            props.history.push(`/createAcc/`)
        } else if (userName != '') {
            alert("Your User Name Is Not In The System --->Please Talk With The Admin")
        } else if (userName == '') {
            alert("There Is No User Name ---> Please Enter Your User Name Given From The Admin")
        }
    }
    console.log(sessionStorage);

    const loginUser = async () => {
        console.log(users);
        let existedUsers = users.filter(user => user.userName == userName && user.password == password && user.password != '');
        if (existedUsers[0] != null) {
            sessionStorage.setItem("userName", userName)
            let user = users.filter(user => user.userName == userName)
            sessionStorage.setItem("userId", user[0]._id)
            let userData = await usersDataUtils.getUserById(user[0]._id)
            console.log(userData.data[0].sessionTimeOut * 60000);
            sessionStorage.setItem("sessionTimeOut", userData.data[0].sessionTimeOut)
            props.history.push(`/main`)
        } else {
            alert("You Are Not A User ---> Please Talk With The Admin")
        }
        console.log(users);
    }

    return (
        <div style={{}}>
            <h2 style={{ borderBottom: "2px solid white", width: "335px" }}>Login To Your Cinema System</h2> <br />
            User Name : <input type="text" placeholder="Enter Your User Name" onChange={e => setUserName(e.target.value)} /><br />
            Password : <input type="password" placeholder="Enter Your Password" onChange={e => setPassword(e.target.value)} /><br />
            <input type="button" value="Login" onClick={loginUser} /> <br />
            New User ? : <Link style={{ color: "unset", textDecorationColor: "#3EDBF0", textDecorationThickness: "3px" }} onClick={createAcc}> Create Account</Link>




        </div>
    )
}
export default LoginComp