import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import PropTypes from "prop-types"

const ProtectedRoute = ({ children }) => {
    const { authState } = useAuth()

    if (!authState.isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
