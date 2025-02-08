import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

const AUTH_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

const initialState = {
    isAuthenticated: false,
    user: null,
};

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
};

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: JSON.parse(storedUser) });
        }
    }, []);


    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
    };


    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContext

