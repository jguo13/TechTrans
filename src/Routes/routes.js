import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./private-route";

import Home from '../pages/home'
import Register from '../pages/register'
import Join from '../pages/login'
import Forgot from '../pages/forgot'
import Profile from "../pages/Profile";
import Error from '../pages/Error'

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Join} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/Forgot" component={Forgot} />
                <PrivateRoute exact path="/Home" component={Home} />
                <Route exact path="/Profile" component={Profile} />
                <Route path="*" component={Error} />
            </Switch>
        </Router>
    )
}

export default Routes;