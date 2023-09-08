import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3">
                <div className="col-md-4 text-center">
                    <p className="lead">Login</p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout