import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <progress className="progress w-96"></progress>
            </div>
        )

    }

    if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.any
}

export default PrivateRoute;