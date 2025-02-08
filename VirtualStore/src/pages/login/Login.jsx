import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (email === 'test@test.com' && password === '1234') {
            const userData = { email }
            login(userData)
            localStorage.setItem('user', JSON.stringify(userData))
            navigate('/')
        } else {
            alert('Incorrect data')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Welcome to the VirtualStore!</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login