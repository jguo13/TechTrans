// import React from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PrivateRoute from "./private-route";

// import Home from '../pages/home'
// import Register from '../pages/register'
// import Join from '../pages/login'
// import Forgot from '../pages/forgot'
// import Profile from "../pages/Profile"
// import Error from '../pages/Error'
// import Contract from "../pages/Contract"

// function Routes() {
//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/" component={Join} />
//                 <Route exact path="/Register" component={Register} />
//                 <Route exact path="/Forgot" component={Forgot} />
//                 <PrivateRoute exact path="/Home" component={Home} />
//                 <Route exact path="/Profile" component={Profile} />
//                 <Route path="*" component={Error} />
//             </Switch>
//         </Router>
//     )
// }

// export default Routes;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./private-route";
import Home from '../pages/home';
import Register from '../pages/register'
import Join from '../pages/login'
import Forgot from '../pages/forgot'
import Profile from "../pages/Profile"
import Error from '../pages/Error'
import Contract from "../pages/Contract"
// Other import statements for your routes...

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Join />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forgot" element={<Forgot />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Contract" element={<Contract />} />
                <Route path="*" element={<Error />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;

