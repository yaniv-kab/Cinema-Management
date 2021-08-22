import react, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MembersUtils from '../../MembersUtils/MembersUtils';



const EditSubscriptionsComp = (props) => {
    const [member, setMember] = useState(JSON.parse(sessionStorage.getItem("member")));
    const history = useHistory()
    const [memberName, setMemberName] = useState(member.name)
    const [memberMail, setMemberMail] = useState(member.email)
    const [memberCity, setMemberCity] = useState(member.city)


    useEffect(async () => {

    }, [])
    const updateMember = async () => {
        let memberToUpdate = {
            name: memberName,
            email: memberMail,
            city: memberCity
        }
        await MembersUtils.updateMember(member._id, memberToUpdate)
        sessionStorage.removeItem("member")
        history.push("/main/subscriptions/all")
    }
    return (
        <div>
            <h3>Edit Member : {member.name}</h3>
            Name : <input type="text" value={memberName} onChange={e => setMemberName(e.target.value)} /> <br />
            Email : <input type="text" value={memberMail} onChange={e => setMemberMail(e.target.value)} /> <br />
            City : <input type="text" value={memberCity} onChange={e => setMemberCity(e.target.value)} /> <br />
            <input type="button" value="Update" onClick={updateMember} />
            <input type="button" value="Cancel" onClick={() => {
                sessionStorage.removeItem("member")
                history.push("/main/subscriptions/all")
            }} />
        </div>
    )
}
export default EditSubscriptionsComp