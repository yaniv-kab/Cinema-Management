import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MembersUtils from '../../MembersUtils/MembersUtils';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';
import SubscribeToNewMovieComp from './SubscribeToNewMovieComp';


const SubscriptionCardComp = (props) => {

    const history = useHistory()
    const [subscriptions, setSubscriptions] = useState([])
    const [permissions, setPermissions] = useState(JSON.parse(sessionStorage.getItem("permissions")).premissions)
    const [member, setMember] = useState({})
    useEffect(async () => {
        let subscriptionsDB = await SubscriptionsUtils.getAllSubscriptions();
        setSubscriptions(subscriptionsDB.data)
        if (props.member != undefined) {
            setMember(props.member)
        } else if (props.match.params.id) {
            let memberById = await MembersUtils.getMemberById(props.match.params.id)
            setMember(memberById.data)
        }
    }, [])

    let editButton;
    let deleteButton;
    if (permissions.includes("Update Subscriptions")) {
        editButton = <input type="button" value="Edit" onClick={() => {
            history.push(`/main/subscriptions/edit/${member._id}`)
            sessionStorage.setItem("member", JSON.stringify(member));
        }} />
    }

    if (permissions.includes("Delete Subscriptions")) {
        deleteButton = <input type="button" value="Delete" onClick={async () => {
            let subscriptionById = subscriptions.filter(sub => sub.memberId == member._id)
            await SubscriptionsUtils.deleteSubscription(subscriptionById[0]._id);
            await MembersUtils.deleteMember(member._id)
            if (props.member != undefined) {
                props.deleteMember(member);
            }
            history.push("/main/subscriptions/all")
        }} />
    }
    let subscribeToNewMovie;
    if (JSON.stringify(member) != "{}") {
        subscribeToNewMovie = <SubscribeToNewMovieComp member={member} />
    }
    return (
        <div style={{ border: "3px solid black", width: "500px" }}>
            <h3>{member.name}</h3>
            Email : {member.email}<br />
            City : {member.city}<br />
            {editButton}
            {deleteButton}
            {subscribeToNewMovie}
            {/* <SubscribeToNewMovieComp member={member} /> */}
        </div>
    )
}
export default SubscriptionCardComp