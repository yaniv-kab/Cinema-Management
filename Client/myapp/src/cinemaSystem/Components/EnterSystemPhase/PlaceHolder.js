import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginComp from './Login'
import CreateAcc from './CreateAccount'
import MainComp from '../MainPhase/MainPage'
const PlaceHolderComp = () => {




    return (
        <div>
            <h1 style={{ borderBottom: "4px solid white", width: "472px" }}> Movies - Subsciptions Web Site</h1>
            <Switch>
                <Route exact path="/" component={LoginComp} />
                <Route path="/createAcc" component={CreateAcc} />
                <Route path="/main" component={MainComp} />
            </Switch>


        </div>
    )
}
export default PlaceHolderComp