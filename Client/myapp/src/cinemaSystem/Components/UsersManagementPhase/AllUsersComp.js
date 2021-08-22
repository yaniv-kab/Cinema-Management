import react, { useEffect, useState } from 'react'
import utils from '../../utils/utils';
import UserCardComp from './UserCardComp';
const AllUserComp = (props) => {
    const [usersData, setUsersData] = useState([]);


    useEffect(async () => {
        let shapedUsers = await utils.getShapedUsers()
        setUsersData(shapedUsers)
    }, [])

    let usersWithoutAdmin = [...usersData];
    usersWithoutAdmin.splice(0, 1);
    let usersCardsToRender = usersWithoutAdmin.map(user => {
        return <UserCardComp key={user.id} user={user} deleteUserCard={(data) => {
            let allusers = usersData;
            let i = allusers.findIndex(user => user.id == data.id);
            allusers.splice(i, 1);
            setUsersData(allusers)
        }} editUserCard={data => {
            let allusers = usersData;
            let i = allusers.findIndex(user => user.id == data.id)
            allusers[i] = data
            setUsersData(allusers)
        }} />
    })
    return (
        <div>
            <h3>All Users :</h3>
            {usersCardsToRender}



        </div>
    )
}

export default AllUserComp