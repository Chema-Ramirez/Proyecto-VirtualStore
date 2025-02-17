import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === 'admin@admin.com' && password === 'admin') {
            navigate('/admin')
            return;
        }

        try {
            const response = await fetch('http://localhost:3005/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();

            if (response.ok) {
                login(data)
                navigate('/home')
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setError('Error connecting to server');
        }
    };

    const handleRegister = () => {
        navigate('/register')
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>

            <div>
                <button onClick={handleRegister}>Register New Account</button>
            </div>
        </div>
    )
}

export default Login
