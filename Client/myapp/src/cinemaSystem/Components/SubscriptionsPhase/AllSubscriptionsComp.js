import react, { useContext, useEffect, useState } from 'react';
import MembersUtils from '../../MembersUtils/MembersUtils';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';
import { SubscriptionsContext } from './SubscriptionsContext';
import SubscriptionCardComp from './SubscriptionCardComp';



const AllSubscriptionsComp = (props) => {

    const [members, setMembers] = useState([])
    const [subscriptions, setSubscriptions] = useContext(SubscriptionsContext)
    useEffect(async () => {
        let allSubscriptionsData = await SubscriptionsUtils.getAllSubscriptions()
        let membersFromDB = await MembersUtils.getMembersAllData();
        setSubscriptions(allSubscriptionsData.data)
        setMembers(membersFromDB.data)
    }, [])
    let membersThatSubscriptions = members.filter(member => {
        let index = subscriptions.findIndex(sub => sub.memberId == member._id);
        return (members[index])
    })
    let subscriptionsToRender
    if (membersThatSubscriptions) {
        subscriptionsToRender = membersThatSubscriptions.map(member => {
            return <SubscriptionCardComp key={member._id} subscriptions={subscriptions} member={member} deleteMember={(data) => {
                let allMembers = members
                let i = allMembers.findIndex(member => member._id == data._id)
                allMembers.splice(i, 1);
                setMembers(allMembers)

            }} />
        })
    }

    return (
        <div>
            {subscriptionsToRender}

        </div>
    )
}
export default AllSubscriptionsComp