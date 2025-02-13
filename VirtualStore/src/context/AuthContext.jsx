import { createContext, useContext, useReducer, useEffect } from "react"
import PropTypes from "prop-types"

const AUTH_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const useIsAuthenticated = () => {
    const { authState } = useAuth();
    return authState.isAuthenticated;
}

export const AuthProvider = ({ children }) => {
    const [{ isAuthenticated, user }, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: JSON.parse(storedUser) });
        }
    }, [])

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", userData.token)
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData })
    }

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }

    return (
        <AuthContext.Provider value={{ authState: { isAuthenticated, user }, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContext
