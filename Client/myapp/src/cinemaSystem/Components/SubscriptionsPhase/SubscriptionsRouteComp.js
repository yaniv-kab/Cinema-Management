import react, { useEffect, useState } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import { SubscriptionsContextProvider } from './SubscriptionsContext';
import AllSubscriptionsComp from './AllSubscriptionsComp';
import AddSubscriptionsComp from './AddSubscriptionComp';
import EditSubscriptionsComp from './EditSubscriptionComp';
import SubscriptionCardComp from './SubscriptionCardComp';
const SubscriptionsRouteComp = () => {
    const history = useHistory();
    const [permissions, setPermissions] = useState(JSON.parse(sessionStorage.getItem("permissions")).premissions)
    let allYellowed;
    let addYellowed;
    if (history.location.pathname == "/main/subscriptions/all") {
        allYellowed = "#3EDBF0"
        addYellowed = null
    } else if (history.location.pathname == "/main/subscriptions/add") {
        allYellowed = null;
        addYellowed = "#3EDBF0"
    }



    return (
        <div style={{ border: "3px solid black", width: "750px" }}>
            <h2>Subscriptions</h2>
            <input type="button" style={{ backgroundColor: allYellowed }} value="All Members" onClick={() => {
                if (permissions.includes("View Subscriptions")) { history.push('/main/subscriptions/all') } else {
                    alert("You Dont Have The Right Permission")
                }
            }} />
            <input type="button" style={{ backgroundColor: addYellowed }} value="Add Member" onClick={() => {
                if (permissions.includes("Create Subscriptions")) { history.push('/main/subscriptions/add') } else {
                    alert("You Dont Have The Right Permission")
                }
            }} />
            <Switch>
                <SubscriptionsContextProvider>
                    <Route exact path="/main/subscriptions/all" component={AllSubscriptionsComp} />
                    <Route path="/main/subscriptions/add" component={AddSubscriptionsComp} />
                    <Route path="/main/subscriptions/edit/:id" component={EditSubscriptionsComp} />
                    <Route path="/main/subscriptions/all/:id" component={SubscriptionCardComp} />
                </SubscriptionsContextProvider>
            </Switch>







        </div>
    )
}
export default SubscriptionsRouteComp