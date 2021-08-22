import react, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MembersUtils from '../../MembersUtils/MembersUtils';
import SubscriptionsUtils from '../../SubscriptionsUtils/SubscriptionsUtils';



const AddSubscriptionsComp = () => {

    const history = useHistory()
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberCity, setMemberCity] = useState('')
    const saveMember = async () => {
        let memberToSave = {
            name: memberName,
            email: memberEmail,
            city: memberCity
        }
        let newMember = await MembersUtils.addMember(memberToSave);
        const memberDataId = newMember.data._id

        let subscriptionToAdd = {
            memberId: memberDataId,
            movies: []
        }
        await SubscriptionsUtils.addSubscription(subscriptionToAdd)
        history.push('/main/subscriptions/all')
    }
    return (
        <div>
            <h3>Add New Member</h3>
            Name : <input type="text" onChange={e => setMemberName(e.target.value)} /><br />
            Email : <input type="text" onChange={e => setMemberEmail(e.target.value)} /><br />
            City : <input type="text" onChange={e => setMemberCity(e.target.value)} /><br />
            <input type="button" value="Save" onClick={saveMember} />
            <input type="button" value="Cancel" onClick={() => { history.push('/main/subscriptions/all') }} />
        </div>
    )
}
export default AddSubscriptionsComp