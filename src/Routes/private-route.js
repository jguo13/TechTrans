// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'

// function PrivateRoute({ component, ...rest }) {

//     const user = localStorage.getItem("user");

//     if(!user){
//         return <Redirect to="/" />
//     }

//     return <Route {...rest} component={component} />
// }

// export default PrivateRoute


import React from 'react';
import { Route, Outlet, useNavigate } from 'react-router-dom';

function PrivateRoute() {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    if (!user) {
        // If user is not authenticated, navigate to the login page
        navigate('/');
        return null; // You can also return a redirect component if you have one.
    }

    // If user is authenticated, render the child components
    return <Outlet />;
}

export default PrivateRoute;

