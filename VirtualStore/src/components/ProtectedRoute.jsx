import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import PropTypes from "prop-types"

const ProtectedRoute = ({ children }) => {
    const { state } = useAuth()

    if (!state.isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default ProtectedRoute
